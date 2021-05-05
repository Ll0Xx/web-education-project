// https://codepen.io/killate/pen/XZNgNX
//
(function (options) {

    $.makeSlider = function ($carouselElement, options) {

        var settings = $.extend({
            // These are the defaults.
            color: "#556b2f",
            backgroundColor: "white"
        }, options );

        let className = $($carouselElement).attr("class");

        $(window).resize(function () {
            console.log("yay resized")
        });

        const goToSlide = function (slide) {
            const $slides = $(".worker-container");

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

        let makeControlElements = function () {
            $($carouselElement).append('<div class="' + className + '-prev prev"><a></a></div><div class="' + className + '-next next"><a></a></div>');
        };

        let makeDots = function () {
            var numberOfSlides = 4

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

        makeControlElements();
        if (settings.showDots === true) {
            makeDots()
        }
        watchers();
    }

    $.fn.makeSlider = function () {
        return this.each(function () {
            (new $.makeSlider(this, options));
        });
    };
})(jQuery);

$(".workers-container").makeSlider({
    showDots: true
});