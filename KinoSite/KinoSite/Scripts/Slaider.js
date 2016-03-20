$(document).ready(function () {
    $('.head_slaider').attr('timer', setInterval(AutoSlide, 3000));

    $('.head_slaider').mouseenter(function () {
        clearInterval($(this).attr('timer'))
    });

    $('.head_slaider').mouseleave(function () {
        $(this).attr('timer', setInterval(AutoSlide, 3000));
    });
});

function AutoSlide() {
    var element = $('.head_slaider').get(0);

    if ($(element).attr('slide') == "false") {
        $(element).attr('slide', 'true');

        var items = $(element).find('.item');
        var activeItemId;
        var itemToShowId;

        for (var i = 0; i < items.length; i++) {
            if ($(items[i]).hasClass('active')) {
                activeItemId = i;
            }
        }

        if (activeItemId == (items.length - 1)) {
            itemToShowId = 0;
        }
        else {
            itemToShowId = activeItemId + 1;
        }

        $(items[itemToShowId]).addClass('next');

        $(items[activeItemId]).addClass('left');

        setTimeout(function () {
            $(items[itemToShowId]).addClass('left');
        }, 20);

        setTimeout(function () {
            $(items[activeItemId]).removeClass('active').removeClass('left');
            $(items[itemToShowId]).removeClass('next').removeClass('left').addClass('active');
            $(element).attr('slide', 'false');
        }, 600);
    }
}

function OnLeftClick(element) {
    var slaider = $(element).parents('.slaider').get(0) || $(element).parents('.head_slaider').get(0);

    if ($(slaider).attr('slide') == "false") {
        $(slaider).attr('slide', 'true');

        var items = $(slaider).find('.item');
        var activeItemId;
        var itemToShowId;

        for (var i = 0; i < items.length; i++) {
            if ($(items[i]).hasClass('active')) {
                activeItemId = i;
            }
        }

        if (activeItemId == 0) {
            itemToShowId = items.length - 1;
        }
        else {
            itemToShowId = activeItemId - 1;
        }

        $(items[itemToShowId]).addClass('prev');

        $(items[activeItemId]).addClass('right');

        setTimeout(function () {
            $(items[itemToShowId]).addClass('right');
        }, 10);

        setTimeout(function () {
            $(items[activeItemId]).removeClass('active').removeClass('right');
            $(items[itemToShowId]).removeClass('prev').removeClass('right').addClass('active');
            $(slaider).attr('slide', 'false');
        }, 700);
    }
}

function OnRightClick(element) {
    var slaider = $(element).parents('.slaider').get(0) || $(element).parents('.head_slaider').get(0);

    if ($(slaider).attr('slide') == "false") {
        $(slaider).attr('slide', 'true');

        var items = $(slaider).find('.item');
        var activeItemId;
        var itemToShowId;

        for (var i = 0; i < items.length; i++) {
            if ($(items[i]).hasClass('active')) {
                activeItemId = i;
            }
        }

        if (activeItemId == (items.length - 1)) {
            itemToShowId = 0;
        }
        else {
            itemToShowId = activeItemId + 1;
        }

        $(items[itemToShowId]).addClass('next');

        $(items[activeItemId]).addClass('left');

        setTimeout(function () {
            $(items[itemToShowId]).addClass('left');
        }, 10);

        setTimeout(function () {
            $(items[activeItemId]).removeClass('active').removeClass('left');
            $(items[itemToShowId]).removeClass('next').removeClass('left').addClass('active');
            $(slaider).attr('slide', 'false');
        }, 700);
    }
}