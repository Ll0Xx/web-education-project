$(document).ready(function () {
    $('.icon').on('click', function () {
        $('.menu').toggleClass('responsive')
        $('body').toggleClass('no-scrollable')
    })

    $('.menu').children().on('click', function () {
        $('.menu').removeClass('responsive')
        $('body').removeClass('no-scrollable')
    })
})