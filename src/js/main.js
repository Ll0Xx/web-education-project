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

function showSlides(n) {
    const slides = document.getElementsByClassName("worker-container");
    if (n === 1) {
        const lastElement = slides[slides.length - 1];
        lastElement.parentNode.insertBefore(lastElement, slides[0]);
    } else {
        const firstElement = slides[0];
        firstElement.parentNode.insertBefore(firstElement, slides[slides.length]);
    }
}

filterSelection("all")

function filterSelection(c) {
    let x, i;
    x = document.getElementsByClassName("work-container");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
    }
}

function addClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function removeClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

var btnContainer = document.getElementById("switch-container");
var btns = btnContainer.getElementsByClassName("switch");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        const current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}