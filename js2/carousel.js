// FOR UPCOMING MOVIES IMAGE SLIDER

$(document).ready(function () {
  var $carousel = $('#movieCarousel');
  var $inner = $carousel.find('.carousel-inner');
  var $item = $inner.find('.item');
  var $movies = $item.find('.movie');

  var index = 0;
  var $leftArrow = $carousel.find('.left');
  var $rightArrow = $carousel.find('.right');

  function getVisibleCount() {
    var containerWidth = $carousel.width();
    var cardWidth = $movies.outerWidth(true);
    return Math.max(1, Math.floor(containerWidth / cardWidth)); // at least 1
  }

  function getStep() {
    return (window.innerWidth >= 1075) ? 6 : 1;
  }

  function getMaxIndex(visibleCount) {
    // number of positions you can scroll before end
    return Math.max(0, $movies.length - visibleCount);
  }

  function updateCarousel() {
    var visibleCount = getVisibleCount();
    var offset = -(index * (100 / visibleCount));
    $item.css({
      transition: 'transform 0.4s ease',
      transform: 'translateX(' + offset + '%)'
    });
    updateArrows();
  }

  function updateArrows() {
    var visibleCount = getVisibleCount();
    var maxIndex = getMaxIndex(visibleCount);

    // hide/show left arrow
    if (index <= 0) {
      $leftArrow.addClass('hidden');
    } else {
      $leftArrow.removeClass('hidden');
    }

    // hide/show right arrow strictly at end
    if (index >= maxIndex) {
      index = maxIndex; // clamp
      $rightArrow.addClass('hidden');
    } else {
      $rightArrow.removeClass('hidden');
    }
  }

  $leftArrow.on('click', function () {
    var step = getStep();
    if (index > 0) {
      index -= step;
      if (index < 0) index = 0;
      updateCarousel();
    }
  });

  $rightArrow.on('click', function () {
    var visibleCount = getVisibleCount();
    var maxIndex = getMaxIndex(visibleCount);
    var step = getStep();
    if (index < maxIndex) {             // <--- only move if not at end
      index += step;
      if (index > maxIndex) index = maxIndex;
      updateCarousel();
    } else {
      // already at end, just ensure arrow hidden
      updateArrows();
    }
  });

  $(window).on('resize', function () {
    var visibleCount = getVisibleCount();
    var maxIndex = getMaxIndex(visibleCount);
    if (index > maxIndex) index = maxIndex;
    updateCarousel();
  });

  // init
  updateCarousel();
});


