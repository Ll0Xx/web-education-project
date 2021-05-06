$(document).ready(function () {
    filterSelection("all")

    $(".switch").on("click", function () {
        $(".switch").removeClass("active");
        let className = this.classList[1]
        filterSelection(className);
        $("." + className).addClass("active");
    })
})

function filterSelection(type) {
    let $worksList = $('.work-container')
    if (type === "all") type = "";
    for (let i = 0; i < $worksList.length; i++) {
        $worksList.eq(i).removeClass("show");
        if ($worksList[i].className.indexOf(type) > -1) $worksList.eq(i).addClass('show');
    }
}