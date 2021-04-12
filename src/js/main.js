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