// https://codepen.io/killate/pen/XZNgNX
//
(function ($) {

    $.makeSlider = function ($carouselElement) {

        let className = $($carouselElement).attr("class");

        const goToSlide = function (slide) {
            const $slides = $(".worker-container");

            if (slide === 1) {
                const $lastElement = $slides.last();

                $lastElement.fadeOut("fast", function () {
                    $lastElement.parent().prepend($lastElement);
                    $lastElement.fadeIn("fast");
                });
            } else {
                const firstElement = $slides.first();

                firstElement.fadeOut("fast", function () {
                    firstElement.parent().append(firstElement);
                    firstElement.fadeIn("fast");
                });
            }
        };

        let makeDots = function () {
            $($carouselElement).append('<div class="' + className + '-prev prev"><a></a></div><div class="' + className + '-next next"><a></a></div>');
        };

        const next = function () {
            goToSlide(1);
        };

        const prev = function () {
            goToSlide(-1);
        };

        const watchers = function () {
            $("." + className + "-next").click(function () {
                next();
            });

            $("." + className + "-prev").click(function () {
                prev();
            });
        };

        makeDots();
        watchers();
    }

    $.fn.makeSlider = function () {
        return this.each(function () {
            (new $.makeSlider(this));
        });
    };
})(jQuery);

$(".workers-container").makeSlider();