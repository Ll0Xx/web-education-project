// https://codepen.io/killate/pen/XZNgNX
//
(function ($) {

    $.makeSlider = function ($carouselElement) {

        let carouselWidth = null,
            lastSeenAt = null,
            numberOfSlides = 0,
            currentSlide = 1,
            timeout,
            className = $($carouselElement).attr("class");


        // const slides = document.getElementsByClassName("worker-container");
        // if (direction === 1) {
        //     const lastElement = slides[slides.length - 1];
        //     lastElement.parentNode.insertBefore(lastElement, slides[0]);
        // } else {
        //     const firstElement = slides[0];
        //     firstElement.parentNode.insertBefore(firstElement, slides[slides.length]);
        // }


        const goToSlide = function (slide) {
            // let oldLeft = parseInt($($carouselElement).css("left")),
            //     newLeft;
            //
            // currentSlide = slide;
            //
            // newLeft = (currentSlide - 1) * $(window).width() * -1;
            //
            // if (newLeft > 0) {
            //     newLeft = 0;
            //     currentSlide = 1;
            // } else if (newLeft < (carouselWidth - $(window).width()) * -1) {
            //     newLeft = (carouselWidth - $(window).width()) * -1;
            //     currentSlide = numberOfSlides;
            // }
            //
            // $($carouselElement).animate({
            //     left: newLeft
            // }, 100);

            const slides = document.getElementsByClassName("worker-container");

            if (slide === 1) {
                const lastElement = slides[slides.length - 1];
                lastElement.parentNode.insertBefore(lastElement, slides[0]);
            } else {
                const firstElement = slides[0];
                firstElement.parentNode.insertBefore(firstElement, slides[slides.length]);
            }

            // goToDot(currentSlide);
        };

        let makeDots = function () {
            console.log("lal");
            $($carouselElement).append('<div class="' + className + '-prev prev"></div><div class="' + className + '-next next"></div>');

            for (let i = 0; numberOfSlides > i; i++) {

                if (i === 0) {
                    $("." + className + "-dots").append("<div class='dot active slide-" + (i + 1) + "'></div>");
                } else {
                    $("." + className + "-dots").append("<div class='dot slide-" + (i + 1) + "'></div>");
                }
            }
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

            // $("." + className +"-dots .dot").click(function($this) {
            //     var dotNumber = $this.target.className.replace(/[^0-9]/g, '');
            //     currentSlide = parseInt(dotNumber);
            //     goToSlide(currentSlide);
            // })

            $(window).resize(function () {
                // calculateCarouselWidth();

                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    goToSlide(currentSlide);
                }, 250);
            })
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