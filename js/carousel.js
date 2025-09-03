// FOR UPCOMING MOVIES IMAGE SLIDER

$(document).ready(function () {
  var $carousel = $('#movieCarousel');
  var $inner = $carousel.find('.carousel-inner');
  var $item = $inner.find('.item');
  var $movies = $item.find('.movie');
  
  var totalMovies = $movies.length;
  var visible = 5; // number of visible posters
  var index = 0;

  var $leftArrow = $carousel.find('.left');
  var $rightArrow = $carousel.find('.right');

  function updateCarousel() {
    var offset = -(index * (100 / visible));
    $item.css('transform', 'translateX(' + offset + '%)');

    // Hide left arrow if at first
    if (index === 0) {
      $leftArrow.addClass('hidden');
    } else {
      $leftArrow.removeClass('hidden');
    }

    // Hide right arrow if at last
    if (index >= totalMovies - visible) {
      $rightArrow.addClass('hidden');
    } else {
      $rightArrow.removeClass('hidden');
    }
  }

  // Initial arrow state
  updateCarousel();

  $leftArrow.click(function () {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  $rightArrow.click(function () {
    if (index < totalMovies - visible) {
      index++;
      updateCarousel();
    }
  });
});