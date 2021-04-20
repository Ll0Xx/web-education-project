function openCloseNavMenu() {
    console.log("yay");
    const x = document.getElementById("nav-menu");
    if (x.className === "menu") {
        x.className += " responsive";
        window.onscroll = function () {
            window.scrollTo(0, 0);
        };
    } else {
        x.className = "menu";
        allowScroll()
    }
}

function allowScroll() {
    window.onscroll = function () {
    };
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;

    const slides = document.getElementsByClassName("worker-container");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";

    // const dots = document.getElementsByClassName("dot");
    // for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    // }
    // dots[slideIndex-1].className += " active";
}