// FOR NOW STREAMING IMAGE SLIDER

$(function(){
    var $track = $('.movie-track');
    var $items = $('.movie-item');
    var itemWidth = $items.outerWidth(true);

    $('.arrow.right').click(function(){
        $track.css('transition', 'transform 0.4s ease');
        $track.css('transform', 'translateX(' + (-itemWidth) + 'px)');
        setTimeout(function(){
            $track.css('transition', 'none');
            $track.append($track.find('.movie-item').first());
            $track.css('transform', 'translateX(0)');
        }, 400);
    });
    
    $('.arrow.left').click(function(){
        $track.css('transition', 'none');
        $track.prepend($track.find('.movie-item').last());
        $track.css('transform', 'translateX(' + (-itemWidth) + 'px)');
        setTimeout(function(){
            $track.css('transition', 'transform 0.4s ease');
            $track.css('transform', 'translateX(0)');
        }, 20);
    });
});
