// https://codepen.io/killate/pen/XZNgNX
//
(function () {

    $.makeSlider = function ($carouselElement, options) {

        let currentSlide = 0;

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

        const goToSlide = function (slideDirection, elementsToScroll) {
            slideDirection *= -1
            let $slides = $($carouselElement).find(".slide");
            let $sidesToScroll, copiedSlides;

            currentSlide += -slideDirection * elementsToScroll;

            if (currentSlide < 0) {
                currentSlide = $slides.length + currentSlide;
            }
            if (currentSlide >= $slides.length) {
                currentSlide = currentSlide - $slides.length;
            }

            setActiveDot(currentSlide);

            if (slideDirection === 1) {
                $sidesToScroll = $slides.slice($slides.length - elementsToScroll, $slides.length);
                copiedSlides = $sidesToScroll.clone().prependTo($slides.parent());
            } else {
                $sidesToScroll = $slides.slice(0, elementsToScroll);
                copiedSlides = $sidesToScroll.clone().appendTo($slides.parent());
            }
            $slides = $($carouselElement).find(".slide");
            if (slideDirection === 1) {
                $slides.css('left', -($sidesToScroll.width() + parseInt($sidesToScroll.css("marginLeft")) * 2) * elementsToScroll);
            }

            $slides.animate({
                left: (slideDirection === 1) ? 0 : -($slides.width() + parseInt($slides.css("marginLeft")) * 2) * elementsToScroll
            }, 300, function () {
                $slides.css('left', '0');
                $sidesToScroll.css('opacity', '1');
                copiedSlides.remove();
                if (slideDirection === 1) {
                    $sidesToScroll.parent().prepend($sidesToScroll);
                } else {
                    $sidesToScroll.parent().append($sidesToScroll);
                }
            });
        };

        let calculateElementsWidth = function () {
            let sliderContainer = $($carouselElement).children(0).prevObject
            let sliderContainerWidth = sliderContainer.width();
            let slides = sliderContainer.children().eq(0).children();
            let calculatedElementWidth = sliderContainerWidth / settings.showElementsCount
                - parseInt(slides.eq(0).css("marginLeft")) * 2;
            slides.css("min-width", calculatedElementWidth);
            sliderContainer.css("height", slides.eq(0).css("height"));
        }

        let makeArrows = function () {
            $($carouselElement).append('<div class="arrows-container"><div  class="' + className + '-prev prev"><a></a></div><div class="' + className + '-next next"><a></a></div></div>');
        };

        let makeDots = function () {
            const slidesCount = $($carouselElement).find(".slide").length;
            const dotCount = slidesCount;

            $($carouselElement).append('<div class="' + className + '-dots dots">');

            for (let i = 0; dotCount > i; i++) {
                if (i === 0) {
                    $("." + className + "-dots").append("<div class='dot active slide-" + i + "'></div>");
                } else {
                    $("." + className + "-dots").append("<div class='dot slide-" + i + "'></div>");
                }
            }
        }

        const setActiveDot = function (currentSlide) {
            $("." + className + "-dots .dot").removeClass("active");
            $("." + className + "-dots .dot.slide-" + currentSlide).addClass("active");
        };

        const next = function () {
            goToSlide(1, settings.elementsToScroll);
        };

        const prev = function () {
            goToSlide(-1, settings.elementsToScroll);
        };

        const watchers = function () {
            $("." + className + "-next").click(function () {
                next();
            });

            $("." + className + "-prev").click(function () {
                prev();
            });

            $("." + className + "-dots .dot").click(function ($this) {
                const dotNumber = parseInt($this.target.className.replace(/[^0-9]/g, ''));
                let slide = dotNumber - currentSlide;
                goToSlide(Math.sign(slide), Math.abs(slide));
                setActiveDot(dotNumber);
            })
        };

        calculateElementsWidth();

        if (settings.showArrows === true) {
            makeArrows();
        }
        if (settings.showDots === true) {
            makeDots()
        }
        watchers();
    }

    $.fn.makeSlider = function (options) {
        return this.each(function () {
            (new $.makeSlider(this, options));
        });
    };
})(jQuery);

$(".workers-slider-container").makeSlider({
    showElementsCount: 4,
    elementsToScroll: 2,
    showDots: true,
    showArrows: true
});