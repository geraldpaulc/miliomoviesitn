// FOR FEATURED MOVIES IMAGE SLIDER

$(function () {
    var $filmTrack = $('.film-track');
    var filmItemWidth = $('.film-item').outerWidth(true);
    var position = 0;          // current translateX (px)
    var speed = 0.35;          // continuous drift speed (px/frame)
    var isAnimating = false;

    function recalc() {
        filmItemWidth = $('.film-item').outerWidth(true);
        normalize();
        $filmTrack.css('transform', 'translateX(' + position + 'px)');
    }
    $(window).on('resize', recalc);

    // Keep position within [-filmItemWidth, 0) and reorder discreetly
    function normalize() {
        while (position <= -filmItemWidth) {
            position += filmItemWidth;
            $filmTrack.append($filmTrack.find('.film-item').first());
        }
        while (position > 0) {
            position -= filmItemWidth;
            $filmTrack.prepend($filmTrack.find('.film-item').last());
        }
    }

    // Continuous slow auto-slide
    function loop() {
        if (!isAnimating) {
            position -= speed;
            normalize();
            $filmTrack.css('transform', 'translateX(' + position + 'px)');
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Smooth arrow step by exactly one item (no mid-animation reorders)
    function animateBy(delta) {
        if (isAnimating) return;
        isAnimating = true;

        var start = position;
        var end = position + delta;     // delta: negative = next (right arrow), positive = prev (left arrow)
        var duration = 400;             // ms
        var startTime = null;

        function step(ts) {
            if (!startTime) startTime = ts;
            var t = (ts - startTime) / duration;
            if (t > 1) t = 1;

            position = start + (end - start) * t;
            // Do NOT normalize during animation — prevents image swapping
            $filmTrack.css('transform', 'translateX(' + position + 'px)');

            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                // Snap to end, then normalize ONCE to rotate items cleanly
                position = end;

                if (delta < 0) {
                    // moved left by 1 card (right arrow)
                    while (position <= -filmItemWidth) {
                        position += filmItemWidth;
                        $filmTrack.append($filmTrack.find('.film-item').first());
                    }
                } else if (delta > 0) {
                    // moved right by 1 card (left arrow)
                    while (position > 0) {
                        position -= filmItemWidth;
                        $filmTrack.prepend($filmTrack.find('.film-item').last());
                    }
                }

                $filmTrack.css('transform', 'translateX(' + position + 'px)');
                isAnimating = false;
            }
        }
        requestAnimationFrame(step);
    }

    // Arrow bindings
    $('.film-right').on('click', function (e) {
        e.preventDefault();
        animateBy(-filmItemWidth);
    });

    $('.film-left').on('click', function (e) {
        e.preventDefault();
        animateBy(filmItemWidth);
    });
});
