/* =========================================================================
   SCRIPT.JS - Carousel & Expandable Services Logic
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {

    // -------------------------------------------------------
    // CAROUSEL FUNCTIONALITY (generic, works for all carousels)
    // -------------------------------------------------------
    function initCarousel(carouselEl) {
        var slides = carouselEl.querySelectorAll('.carousel-slide');
        var prevBtn = carouselEl.querySelector('.carousel-prev');
        var nextBtn = carouselEl.querySelector('.carousel-next');
        var dots = carouselEl.querySelectorAll('.dot');
        var currentIndex = 0;

        function goToSlide(index) {
            // Wrap around
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            // Update slides
            for (var i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
            }
            slides[index].classList.add('active');

            // Update dots if they exist
            for (var j = 0; j < dots.length; j++) {
                dots[j].classList.remove('active');
            }
            if (dots.length > 0 && dots[index]) {
                dots[index].classList.add('active');
            }

            currentIndex = index;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                goToSlide(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                goToSlide(currentIndex + 1);
            });
        }

        // Dot click navigation
        for (var d = 0; d < dots.length; d++) {
            dots[d].addEventListener('click', function (e) {
                e.stopPropagation();
                var idx = parseInt(this.getAttribute('data-index'), 10);
                goToSlide(idx);
            });
        }

        return { goToSlide: goToSlide };
    }

    // -------------------------------------------------------
    // SPOTLIGHT CAROUSEL with auto-play
    // -------------------------------------------------------
    var spotlightCarousel = document.getElementById('spotlight-carousel');
    if (spotlightCarousel) {
        var spotCtrl = initCarousel(spotlightCarousel);
        var autoIndex = 0;
        var autoInterval = setInterval(function () {
            autoIndex++;
            spotCtrl.goToSlide(autoIndex);
        }, 4000);

        // Pause auto-play on hover
        spotlightCarousel.addEventListener('mouseenter', function () {
            clearInterval(autoInterval);
        });
        spotlightCarousel.addEventListener('mouseleave', function () {
            autoInterval = setInterval(function () {
                autoIndex++;
                spotCtrl.goToSlide(autoIndex);
            }, 4000);
        });
    }

    // -------------------------------------------------------
    // EXPANDABLE SERVICES
    // -------------------------------------------------------
    var serviceItems = document.querySelectorAll('.service-item');

    for (var i = 0; i < serviceItems.length; i++) {
        (function (item) {
            var header = item.querySelector('.service-header');

            header.addEventListener('click', function () {
                var isExpanded = item.classList.contains('expanded');

                // Close all others
                for (var j = 0; j < serviceItems.length; j++) {
                    serviceItems[j].classList.remove('expanded');
                }

                // Toggle current
                if (!isExpanded) {
                    item.classList.add('expanded');

                    // Initialize mini carousel inside this item if not already done
                    var miniCarousel = item.querySelector('.mini-carousel');
                    if (miniCarousel && !miniCarousel.dataset.initialized) {
                        initCarousel(miniCarousel);
                        miniCarousel.dataset.initialized = 'true';
                    }
                }
            });
        })(serviceItems[i]);
    }

});
