// https://codepen.io/killate/pen/XZNgNX
//
(function () {

    $.makeSlider = function ($carouselElement, options) {

        let settings = $.extend({
            showElementsCount: 3,
            elementsToScroll: 1,
            showArrows: false,
            showDots: false
        }, options);

        let className = $($carouselElement).attr("class");

        $(window).resize(function () {
            calculateElementsWidth()
        });

        const goToSlide = function (slide) {
            const $slides = $($carouselElement).find(".slide");

            if (slide === 1) {
                const $lastElement = $slides.last();

                $slides.animate({
                    left: $lastElement.width() + parseInt($lastElement.css("marginLeft")) * 2
                }, 300, function () {
                    $slides.css('left', '0');
                    $lastElement.css('opacity', '1');
                    $lastElement.parent().prepend($lastElement);
                });
            } else {
                const $firstElement = $slides.first();

                $slides.animate({
                    left: -($firstElement.width() + parseInt($firstElement.css("marginLeft")) * 2)
                }, 300, function () {
                    $slides.css('left', '0');
                    $firstElement.css('opacity', '1');
                    $firstElement.parent().append($firstElement);
                });
            }
        };

        let calculateElementsWidth = function () {
            let sliderContainer = $($carouselElement).find('slides-container')
            let sliderContainerWidth = sliderContainer.prevObject.width();
            let calculatedElementWidth = sliderContainerWidth / settings.showElementsCount
                - parseInt(sliderContainer.prevObject.children().children().css("marginLeft")) * 2;
            sliderContainer.prevObject.children().children().css("min-width", calculatedElementWidth);
        }

        let makeArrows = function () {
            $($carouselElement).append('<div class="arrows-container"><div  class="' + className + '-prev prev"><a></a></div><div class="' + className + '-next next"><a></a></div></div>');
        };

        let makeDots = function () {
            const numberOfSlides = 4;

            $($carouselElement).append('<div class="' + className + '-dots dots">');

            for (let i = 0; numberOfSlides > i; i++) {
                if (i === 0) {
                    $("." + className + "-dots").append("<div class='dot active slide-" + (i + 1) + "'></div>");
                } else {
                    $("." + className + "-dots").append("<div class='dot slide-" + (i + 1) + "'></div>");
                }
            }
        }

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

        calculateElementsWidth();

        if (settings.showArrows === true) {
            makeArrows();
        }
        // if (settings.showDots === true) {
        //     makeDots()
        // }
        watchers();
    }

    $.fn.makeSlider = function (options) {
        return this.each(function () {
            (new $.makeSlider(this, options));
        });
    };
})(jQuery);

$(".workers-slider-container").makeSlider({
    showElementsCount: 3,
    showDots: true,
    showArrows: true
});