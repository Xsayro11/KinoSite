﻿function OnVideoClick(element) {
    var player = $(element).parents('#Player');
    var clicks = $(player).attr('clicks');
    var timer = $(player).attr('timer');
    var delay = $(player).attr('delay');

    clicks++;
    $(player).attr('clicks', clicks);

    if (clicks == 1) {
        timer = setTimeout(function () {
            var video = element;

            if (video.paused) {
                video.play();
                $(player).find('.play_poster').css('opacity', '0');
                $(player).find('.play_poster').css('visibility', 'hidden');
            }
            else {
                video.pause();
                $(player).find('.play_poster').attr('style', '');
            }

            $(player).attr('clicks', 0);
        }, delay);

        $(player).attr('timer', timer);
    }
    else {
        clearTimeout(timer);

        var video = element;

        if (video.requestFullscreen) {
            if (!$(player).hasClass("fullscreen")) {
                video.requestFullscreen();
            }
            else {
                document.cancelFullscreen();
            }
        } else if (video.mozRequestFullScreen) {
            if (!$(player).hasClass("fullscreen")) {
                video.mozRequestFullScreen();
            }
            else {
                document.mozCancelFullScreen();
            }
        } else if (video.webkitRequestFullscreen) {
            if (!$(player).hasClass("fullscreen")) {
                video.webkitRequestFullscreen();
            }
            else {
                document.webkitExitFullscreen();
            }
        }

        $(player).attr('clicks', 0);
    }
}

function OnPlayClick(element) {
    var video = $(element).parents('#Player').children('video').get(0);

    if (video.paused) {
        video.play();
        $(element).parents('#Player').find('.play_poster').css('opacity', '0');
        $(element).parents('#Player').find('.play_poster').css('visibility', 'hidden');
    }
    else {
        video.pause();
        $(element).parents('#Player').find('.play_poster').attr('style', '');
    }
}

function MouseOnTimeLine(element) {
    if (!$(element).hasClass('hover')) {
        var duration = parseFloat($(element).parents('#Player').attr('duration'));
        var maxLoad = parseInt($(element).css('width'));
        var offset = parseInt($(element).offset().left);
        var percentage = (100 / (maxLoad / (event.pageX - offset)));
        var time = ((duration / 100) * percentage);
        var hours = parseInt(time / 3600);
        var minutes = parseInt(((time / 60) - (hours * 60)));
        var seconds = parseInt(time - (parseInt((time / 60)) * 60));

        var posX = (Math.floor(time) * 120);
        var posY = parseInt(posX / 1200);

        posX = (posX - (posY * 1200));
        posY = posY * 50;

        $(element).parents('#Player').find('.time_hover').css('background-position-x', "-" + posX + "px");
        $(element).parents('#Player').find('.time_hover').css('background-position-y', "-" + posY + "px");

        $(element).parents('#Player').find('.time_hover span').children('.hours').html(hours);

        if ((minutes / 10) < 1) {
            $(element).parents('#Player').find('.time_hover span').children('.minutes').html("0" + minutes);
        }
        else {
            $(element).parents('#Player').find('.time_hover span').children('.minutes').html(minutes);
        }

        if ((seconds / 10) < 1) {
            $(element).parents('#Player').find('.time_hover span').children('.seconds').html("0" + seconds);
        }
        else {
            $(element).parents('#Player').find('.time_hover span').children('.seconds').html(seconds);
        }

        var left = ((event.pageX - offset) - 60);

        if (left < 0) {
            left = 0;
        }
        else if (left > (maxLoad - 122)) {
            left = maxLoad - 122;
        }

        $(element).parents('#Player').find('.show-time-line').css('left', left);
        $(element).parents('#Player').find('.time_hover').css('left', left);
        $(element).parents('#Player').find('.time_hover').show(0);
        $(element).parents('#Player').find('.show-time-line').show(0);
    }
}

function MouseLeaveTimeLine(element) {
    if (!$(element).hasClass('hover')) {
        $(element).parents('#Player').find('.time_hover').hide(0);
        $(element).parents('#Player').find('.show-time-line').hide(0);
    }
}

function VolumeClick(element) {
    var video = $(element).parents('#Player').children('video').get(0);
    var volumeValue = parseInt($(element).attr('volume'));
    var inner = $(element).children();

    if ($(inner).attr('id') == "muted") {
        $(inner).attr('id', '');

        if (volumeValue == 0) {
            volumeValue = 50;
        }

        $(element).parents('#Player').find('.volume_inner').css('width', volumeValue + "%");
        video.volume = (volumeValue / 100);
        video.muted = false;

        if (volumeValue > 66) {
            $(inner).attr('id', 'volume_100');
        }
        else if (volumeValue > 33) {
            $(inner).attr('id', 'volume_66');
        }
        else if (volumeValue > 0) {
            $(inner).attr('id', 'volume_33');
        }
    }
    else {
        $(inner).attr('id', 'muted');
        $(element).parents('#Player').find('.volume_inner').css('width', 0 + "%");
        video.muted = true;
    }
}

function VolumeHover(element) {
    $(element).parents('#Player').find('.volume_outer').css('width', '100px');
}

function LeftControlsUnHover(element) {
    event = event || window.event
    var related = event.relatedTarget || event.toElement;

    if (!related || (related !== element && !jQuery.contains(element, related) && element.id != "volume_hover")) {
        $(element).parents('#Player').find('.volume_outer').css('width', '0');
    }
}

function TimeLineClick(element) {
    var video = $(element).parents('#Player').children('video').get(0);
    var maxLoad = parseInt($(element).css('width'));
    var offset = parseInt($(element).offset().left);
    var percentage = (100 / (maxLoad / (event.pageX - offset)));
    var time = ((video.duration / 100) * percentage);
    $(element).parents('#Player').find('.current').css('width', (percentage + "%"));
    video.currentTime = time;
}

function TimeLineMouseMove() {
    var element = document.element;
    var video = $(element).parents('#Player').children('video').get(0);
    var duration = parseFloat($(element).parents('#Player').attr('duration'));
    var maxLoad = parseInt($(element).css('width'));
    var offset = parseInt($(element).offset().left);
    var percentage = (100 / (maxLoad / (event.pageX - offset)));

    if (percentage < 0) {
        percentage = 0;
    }
    else if (percentage > 100) {
        percentage = 100;
    }

    var time = ((duration / 100) * percentage);
    var hours = parseInt(time / 3600);
    var minutes = parseInt(((time / 60) - (hours * 60)));
    var seconds = parseInt(time - (parseInt((time / 60)) * 60));

    $(element).parents('#Player').find('.current').css('width', (percentage + "%"));

    var posX = (Math.floor(time) * 120);
    var posY = parseInt(posX / 1200);

    posX = (posX - (posY * 1200));
    posY = posY * 50;

    $(element).parents('#Player').find('.time_hover').css('background-position-x', "-" + posX + "px");
    $(element).parents('#Player').find('.time_hover').css('background-position-y', "-" + posY + "px");

    $(element).parents('#Player').find('.time_hover span').children('.hours').html(hours);
    $(element).parents('#Player').find('.current_time').children('.hours').html(hours);

    if ((minutes / 10) < 1) {
        $(element).parents('#Player').find('.time_hover span').children('.minutes').html("0" + minutes);
        $(element).parents('#Player').find('.current_time').children('.minutes').html("0" + minutes);
    }
    else {
        $(element).parents('#Player').find('.time_hover span').children('.minutes').html(minutes);
        $(element).parents('#Player').find('.current_time').children('.minutes').html(minutes);
    }

    if ((seconds / 10) < 1) {
        $(element).parents('#Player').find('.time_hover span').children('.seconds').html("0" + seconds);
        $(element).parents('#Player').find('.current_time').children('.seconds').html("0" + seconds);
    }
    else {
        $(element).parents('#Player').find('.time_hover span').children('.seconds').html(seconds);
        $(element).parents('#Player').find('.current_time').children('.seconds').html(seconds);
    }

    var left = ((event.pageX - offset) - 60);

    if (left < 0) {
        left = 0;
    }
    else if (left > (maxLoad - 122)) {
        left = maxLoad - 122;
    }

    $(element).parents('#Player').find('.show-time-line').css('left', left);
    $(element).parents('#Player').find('.time_hover').css('left', left);

    video.currentTime = time;
}

function DocumentMouseDown() {
    event.preventDefault();
}

function TimeLineMouseDown(element) {
    var video = $(element).parents('#Player').children('video').get(0);

    if (!video.paused) {
        video.pause();
        $(element).attr('id', 'played');
    }

    $(element).addClass('hover');
    document.element = element;
    document.addEventListener("mousemove", TimeLineMouseMove, false);
    document.addEventListener("mouseup", DocumentMouseUp, false);
    document.addEventListener("mousedown", DocumentMouseDown, false);
    document.addEventListener("selectstart", DocumentMouseDown, false);
}

function FullscreenButtonClick(element) {
    var video = $(element).parents('#Player').children('video').get(0);

    if (video.requestFullscreen) {
        if (!$(element).parents('#Player').hasClass("fullscreen")) {
            video.requestFullscreen();
        }
        else {
            document.cancelFullscreen();
        }
    } else if (video.mozRequestFullScreen) {
        if (!$(element).parents('#Player').hasClass("fullscreen")) {
            video.mozRequestFullScreen();
        }
        else {
            document.mozCancelFullScreen();
        }
    } else if (video.webkitRequestFullscreen) {
        if (!$(element).parents('#Player').hasClass("fullscreen")) {
            video.webkitRequestFullscreen();
        }
        else {
            document.webkitExitFullscreen();
        }
    }
}

function PlayerMouseMove(element) {
    var trigger = parseInt($(element).find('.controls').attr('trigger'));

    $(element).removeClass('hide_cursor');
    $(element).find('.time_line').attr('style', '');

    $(element).find('.controls').attr('timeout', 3);

    if ($(element).hasClass('playing')) {
        if (!$(element).hasClass('fullscreen')) {
            if ($(element).children(".controls").css('bottom') != "39px") {
                if (trigger == 0) {
                    $(element).children(".controls").stop();
                    $(element).children(".controls").animate({
                        bottom: "39px"
                    }, {
                        duration: 250,
                        start: function () {
                            $(element).find('.controls').attr('trigger', 1);
                        },
                        complete: function () {
                            $(element).find('.controls').attr('trigger', 0);
                        }
                    });
                }
            }
        }
        else {
            if ($(element).children(".controls").css('bottom') != "0px") {
                if (trigger == 0) {
                    $(element).children(".controls").stop();
                    $(element).children(".controls").animate({
                        bottom: "0px"
                    }, {
                        duration: 250,
                        start: function () {
                            $(element).find('.controls').attr('trigger', 1);
                        },
                        complete: function () {
                            $(element).find('.controls').attr('trigger', 0);
                        }
                    });
                }
            }
        }
    }
}

function hideControls(element) {
    if ($(element).parents('#Player').find('.left_controls').attr('id') == "volume_hover"
        || $(element).parents('#Player').find('.time_line').hasClass('hover')) {
        return;
    }

    if ($(element).parents('#Player').find('.left_controls').is(':hover')
    || $(element).parents('#Player').find('.right_controls').is(':hover')) {

        if (!$('.movie_time').is(':hover')) {
            return;
        }
    }

    $(element).parents('#Player').find('.time_hover').hide(0);
    $(element).parents('#Player').find('.time_line').css('height', '5px');

    if ($(element).parents('#Player').hasClass('playing')) {
        if (!$(element).parents('#Player').hasClass('fullscreen')) {
            $(element).parents('#Player').find(".controls").animate({
                bottom: "0px"
            }, 250);
        }
        else {
            $(element).parents('#Player').find(".controls").animate({
                bottom: "-39px"
            }, 250);
        }
    }

    $(element).parents('#Player').addClass('hide_cursor');
}

function OnLoadedMetadata(element) {
    $(element).parents('#Player').attr('duration', element.duration);
}

function OnPlay(element) {
    if (!$(element).parents('#Player').hasClass('fullscreen')) {
        $(element).parents('#Player').find('.controls').animate({
            bottom: "39px"
        }, 250);
    }
    else {
        $(element).parents('#Player').find('.controls').animate({
            bottom: "0px"
        }, 250);
    }

    $(element).parents('#Player').find('.play .inner').attr('id', 'pause');
    $(element).parents('#Player').addClass('playing');

    var controlsTimer = setInterval(function () {
        var timeout = parseInt($(element).parents('#Player').find('.controls').attr('timeout'));
        if (timeout >= 0) {
            timeout--;
            $(element).parents('#Player').find('.controls').attr('timeout', timeout);
            if (timeout == 0) {
                hideControls(element);
            }
        }
    }, 1000);

    $(element).parents('#Player').find('.controls').attr('timer', controlsTimer);

    if (element.ended) {
        $(element).parents('#Player').find('.loaded').css('width', 0);
        $(element).parents('#Player').find('.current').css('width', 0);
        $(element).parents('#Player').find('.loaded').css('left', 0);
        $(element).parents('#Player').find('.current').css('left', 0);
    }
}

function OnPause(element) {
    var timer = parseInt($(element).parents('#Player').find('.controls').attr('timer'));
    clearInterval(timer);
    $(element).parents('#Player').find('.play .inner').attr('id', 'play');
    $(element).parents('#Player').removeClass('playing');
}

function OnTimeUpdate(element) {
    var hoursCurrent = parseInt(element.currentTime / 3600);
    var minutesCurrent = parseInt(((element.currentTime / 60) - (hoursCurrent * 60)));
    var secondsCurrent = parseInt(element.currentTime - (parseInt((element.currentTime / 60)) * 60));

    $(element).parents('#Player').find('.current_time').children('.hours').html(hoursCurrent);

    if ((minutesCurrent / 10) < 1) {
        $(element).parents('#Player').find('.current_time').children('.minutes').html("0" + minutesCurrent);
    }
    else {
        $(element).parents('#Player').find('.current_time').children('.minutes').html(minutesCurrent);
    }

    if ((secondsCurrent / 10) < 1) {
        $(element).parents('#Player').find('.current_time').children('.seconds').html("0" + secondsCurrent);
    }
    else {
        $(element).parents('#Player').find('.current_time').children('.seconds').html(secondsCurrent);
    }

    var currentPercentage = element.currentTime / element.duration;

    $(element).parents('#Player').find('.current').css('width', ((currentPercentage * 100) + "%"));
}

function OnProgress(element) {
    var index = 0;
    var bf = element.buffered;
    var time = element.currentTime;

    if (bf.length >= 1) {
        try {
            while (!(bf.start(index) <= time && time <= bf.end(index))) {
                index += 1;
            }

            var loadStartPercentage = bf.start(index) / element.duration;
            var loadEndPercentage = bf.end(index) / element.duration;
            var loadPercentage = loadEndPercentage - loadStartPercentage;

            $(element).parents('#Player').find('.loaded').css('left', ((loadStartPercentage * 100) + "%"));
            $(element).parents('#Player').find('.loaded').css('width', ((loadPercentage * 100) + "%"));
        }
        catch (error) {
            return;
        }
    }
}

function OnEnded(element) {
    if ($(element).parents('#Player').hasClass("fullscreen")) {
        var video = $(element).parents('#Player').children('video').get(0);

        if (video.requestFullscreen) {
            document.cancelFullscreen();
        } else if (video.mozRequestFullScreen) {
            document.mozCancelFullScreen();
        } else if (video.webkitRequestFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    $(element).parents('#Player').find('.play .inner').attr('id', 'play');
    $(element).parents('#Player').removeClass('playing');
    $(element).parents('#Player').find('.time_line').attr('style', '');
    $(element).parents('#Player').find('.play_poster').show();
    $(element).parents('#Player').find(".controls").animate({
        bottom: "39px"
    }, 250);
}

if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', fullscreenHandler, false);
    document.addEventListener('mozfullscreenchange', fullscreenHandler, false);
    document.addEventListener('fullscreenchange', fullscreenHandler, false);
    document.addEventListener('MSFullscreenChange', fullscreenHandler, false);
} else if (document.attachEvent) {
    document.attachEvent('webkitfullscreenchange', fullscreenHandler, false);
    document.attachEvent('mozfullscreenchange', fullscreenHandler, false);
    document.attachEvent('fullscreenchange', fullscreenHandler, false);
    document.attachEvent('MSFullscreenChange', fullscreenHandler, false);
}

function fullscreenHandler(event) {
    if ($(event.target).parents('#Player').find('.controls').hasClass('fullscreen_controls')) {
        $(event.target).parents('#Player').find('.controls').attr('style', 'bottom: 39px;');
        $(event.target).parents('#Player').find('.controls').removeClass('fullscreen_controls');
        $(event.target).parents('#Player').find('.fullscreen_btn .inner').attr('id', 'enter');
    }
    else {
        $(event.target).parents('#Player').find('.controls').attr('style', 'bottom: 0px;');
        $(event.target).parents('#Player').find('.controls').addClass('fullscreen_controls');
        $(event.target).parents('#Player').find('.fullscreen_btn .inner').attr('id', 'exit');
    }

    if (!$(event.target).parents('#Player').hasClass('fullscreen')) {
        $(event.target).parents('#Player').addClass('fullscreen');
    }
    else {
        $(event.target).parents('#Player').removeClass('fullscreen');
    }
}

function VolumeBarClick(element) {
    element = $(element).children();
    var video = $(element).parents('#Player').children('video').get(0);
    var maxLoad = parseInt($(element).css('width'));
    var offset = parseInt($(element).offset().left);
    var percentage = (100 / (maxLoad / (event.pageX - offset)));
    if (percentage >= 100) {
        percentage = 100;
    }
    else if (percentage <= 0) {
        percentage = 0;
    }

    $(element).find('.volume_inner').css('width', (percentage + "%"));
    video.muted = false;
    video.volume = (percentage / 100);

    if (percentage > 66) {
        $(element).parents('#Player').find('.volume').children().attr('id', 'volume_100');
    }
    else if (percentage > 33) {
        $(element).parents('#Player').find('.volume').children().attr('id', 'volume_66');
    }
    else if (percentage > 0) {
        $(element).parents('#Player').find('.volume').children().attr('id', 'volume_33');
    }
    else {
        $(element).parents('#Player').find('.volume').children().attr('id', 'muted');
    }

    $(element).parents('#Player').find('.volume').attr('volume', percentage);
}

function VolumeOuterMouseMove() {
    element = $(document.element).children();
    var video = $(element).parents('#Player').children('video').get(0);
    var maxLoad = parseInt($(element).css('width'));
    var offset = parseInt($(element).offset().left);
    var percentage = (100 / (maxLoad / (event.pageX - offset)));
    if (percentage >= 100) {
        percentage = 100;
    }
    else if (percentage <= 0) {
        percentage = 0;
    }

    $(element).find('.volume_inner').css('width', (percentage + "%"));
    video.muted = false;
    video.volume = (percentage / 100);

    if (percentage > 66) {
        $(element).parents('#Player').find('.volume').children().attr('id', 'volume_100');
    }
    else if (percentage > 33) {
        $(element).parents('#Player').find('.volume').children().attr('id', 'volume_66');
    }
    else if (percentage > 0) {
        $(element).parents('#Player').find('.volume').children().attr('id', 'volume_33');
    }
    else {
        $(element).parents('#Player').find('.volume').children().attr('id', 'muted');
    }

    $(element).parents('#Player').find('.volume').attr('volume', percentage);
}

function DocumentMouseUp() {
    element = document.element;
    var video = $(element).parents('#Player').children('video').get(0);

    if ($(element).hasClass('volume_bar')) {
        event = event || window.event
        var related = event.relatedTarget || event.toElement;
        var leftControls = $(element).parent().get(0);

        if (!related || (related !== leftControls && !jQuery.contains(leftControls, related))) {
            $(element).parents('#Player').find('.volume_outer').css('width', '0');
        }

        $(leftControls).attr('id', '');
    }
    else {
        $(element).removeClass('hover');
        $(element).parents('#Player').find('.time_hover').hide(0);

        if (element.id == "played") {
            video.play();
            $(element).attr('id', '');
        }
    }

    document.removeEventListener("mousemove", TimeLineMouseMove, false);
    document.removeEventListener("mousemove", VolumeOuterMouseMove, false);
    document.removeEventListener("mouseup", DocumentMouseUp, false);
    document.removeEventListener("mousedown", DocumentMouseDown, false);
    document.removeEventListener("selectstart", DocumentMouseDown, false);
    $(element).parents('#Player').find('.controls').attr('timeout', 3);
}

function DocumentMouseDown() {
    event.preventDefault();
}

function VolumeBarMouseDown(element) {
    document.element = element;
    $(element).parent().attr('id', 'volume_hover');
    document.addEventListener("mousemove", VolumeOuterMouseMove, false);
    document.addEventListener("mouseup", DocumentMouseUp, false);
    document.addEventListener("mousedown", DocumentMouseDown, false);
    document.addEventListener("selectstart", DocumentMouseDown, false);
}