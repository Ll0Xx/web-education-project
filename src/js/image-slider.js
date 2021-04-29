// https://codepen.io/killate/pen/XZNgNX
//
(function ($) {

    $.makeSlider = function ($carouselElement) {

        let className = $($carouselElement).attr("class");

        const goToSlide = function (slide) {
            const $container = $(".workers-container");
            const $slides = $(".worker-container");

            if (slide === 1) {
                const $lastElement = $slides.last();

                $slides.animate({
                    left: $lastElement.width() + parseInt( $lastElement.css("marginLeft") ) * 2
                }, 300, function () {
                    console.log("yay done left");
                    $slides.css('left', '0');
                    $lastElement.css('opacity', '1');
                    $lastElement.parent().prepend($lastElement);
                });
            } else {
                const $firstElement = $slides.first();

                $slides.animate({
                    left: -($firstElement.width() + parseInt( $firstElement.css("marginLeft") ) * 2)
                }, 300, function () {
                    console.log("yay done right");
                    $slides.css('left', '0');
                    $firstElement.css('opacity', '1');
                    $firstElement.parent().append($firstElement);
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