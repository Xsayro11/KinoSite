﻿var video;
var timeout;
var controlsTimer;
var animTrigger = false;
var volumeTimeout;
var volumeValue = 100;

function Player() {
    var test = $(this).children('video');
}

$(document).ready(function () {
    video = document.getElementById("video");

    $('.play').click(function () {
        if (video.paused) {
            video.play();
        }
        else {
            video.pause();
        }
    });

    $('.time_line').mousemove(function (e) {
        var maxLoad = parseInt($(this).css('width'));
        var offset = $(this).offset();
        var pos = (100 / (maxLoad / (e.pageX - offset.left)));
        var time = (pos * 100);
        var hours = parseInt(time / 3600);
        var minutes = parseInt(((time / 60) - (hours * 60)));
        var seconds = parseInt(time - (parseInt((time / 60)) * 60));

        if (seconds < 0) {
            seconds = 0;
        }

        $('.time_hover span').children('.hours').html(hours);

        if ((minutes / 10) < 1) {
            $('.time_hover span').children('.minutes').html("0" + minutes);
        }
        else {
            $('.time_hover span').children('.minutes').html(minutes);
        }

        if ((seconds / 10) < 1) {
            $('.time_hover span').children('.seconds').html("0" + seconds);
        }
        else {
            $('.time_hover span').children('.seconds').html(seconds);
        }

        $('.time_hover').css('left', ((e.pageX - offset.left) - 23));
        $('.time_hover').show(0);
    });

    $('.time_line').mouseleave(function () {
        $('.time_hover').hide(0);
    });

    $('.volume').click(function (e) {
        if (e.target !== this)
            return;

        if (this.id === "muted") {
            $(this).attr('id', '');

            if (volumeValue == 0) {
                volumeValue = 50;
            }

            $('.volume_outer').slider("option", "value", volumeValue);
            video.volume = (volumeValue / 100);
            video.muted = false;

            if (volumeValue > 66) {
                $(this).attr('id', 'volume_100');
            }
            else if (volumeValue > 33) {
                $(this).attr('id', 'volume_66');
            }
            else if (volumeValue > 0) {
                $(this).attr('id', 'volume_33');
            }
        }
        else {
            $(this).attr('id', 'muted');
            $(".volume_outer").slider("option", "value", 0);
            video.muted = true;
        }
    });

    $('.volume').hover(function () {
        $('.volume_outer').show(0);
        window.clearTimeout(volumeTimeout);
    },
    function () {
        volumeTimeout = window.setTimeout(hideVolume, 1500);
    });

    $('.volume_outer').hover(function () {
        window.clearTimeout(volumeTimeout);
    },
    function () {
        volumeTimeout = window.setTimeout(hideVolume, 1500);
    });

    function hideVolume() {
        $('.volume_outer').hide(0);
    }

    video.onloadedmetadata = function () {
        var hoursDuration = parseInt(video.duration / 3600);
        var minutesDuration = parseInt(((video.duration / 60) - (hoursDuration * 60)));
        var secondsDuration = parseInt(video.duration - (parseInt((video.duration / 60)) * 60));

        $('.duration').children('.hours').html(hoursDuration);

        if ((minutesDuration / 10) < 1) {
            $('.duration').children('.minutes').html("0" + minutesDuration);
        }
        else {
            $('.duration').children('.minutes').html(minutesDuration);
        }

        if ((secondsDuration / 10) < 1) {
            $('.duration').children('.seconds').html("0" + secondsDuration);
        }
        else {
            $('.duration').children('.seconds').html(secondsDuration);
        }
    };

    video.onplay = function () {
        $('.play').addClass('pause');
        $('#Player').addClass('playing');

        controlsTimer = setInterval(function () {
            timeout--;
            if (timeout == 0) {
                hideControls();
            }
        }, 1000);

        if (video.ended) {
            $('.loaded').css('width', 0);
            $('.current').css('width', 0);
            $('.loaded').css('left', 0);
            $('.current').css('left', 0);
        }
    }

    video.onpause = function () {
        clearInterval(controlsTimer);
        $('.play').removeClass('pause');
        $('#Player').removeClass('playing');
    };

    video.ontimeupdate = function () {
        var hoursCurrent = parseInt(this.currentTime / 3600);
        var minutesCurrent = parseInt(((this.currentTime / 60) - (hoursCurrent * 60)));
        var secondsCurrent = parseInt(this.currentTime - (parseInt((this.currentTime / 60)) * 60));

        $('.current_time').children('.hours').html(hoursCurrent);

        if ((minutesCurrent / 10) < 1) {
            $('.current_time').children('.minutes').html("0" + minutesCurrent);
        }
        else {
            $('.current_time').children('.minutes').html(minutesCurrent);
        }

        if ((secondsCurrent / 10) < 1) {
            $('.current_time').children('.seconds').html("0" + secondsCurrent);
        }
        else {
            $('.current_time').children('.seconds').html(secondsCurrent);
        }

        var currentPercentage = this.currentTime / this.duration;

        $('.current').css('width', ((currentPercentage * 100) + "%"));
    }

    video.onprogress = function () {
        var index = 0;
        var bf = this.buffered;
        var time = this.currentTime;

        if (bf.length >= 1) {
            try {
                while (!(bf.start(index) <= time && time <= bf.end(index))) {
                    index += 1;
                }

                var loadStartPercentage = bf.start(index) / this.duration;
                var loadEndPercentage = bf.end(index) / this.duration;
                var loadPercentage = loadEndPercentage - loadStartPercentage;

                $('.loaded').css('left', ((loadStartPercentage * 100) + "%"));
                $('.loaded').css('width', ((loadPercentage * 100) + "%"));
            }
            catch (error) {
                return;
            }
        }
    }

    video.onended = function () {
        $('.play').removeClass('pause');
        $('#Player').removeClass('playing');
    };

    $('.time_line').click(function (e) {
        var maxLoad = parseInt($(this).css('width'));
        var offset = $(this).offset();
        var pos = (100 / (maxLoad / (e.pageX - offset.left)));
        $('.current').css('width', (pos + "%"));
        video.currentTime = (pos * 100);
    });

    $(".volume_outer").slider({
        orientation: "vertical",
        min: 0,
        max: 100,
        value: 100,
        range: "min",
        animate: true,
        slide: function (event, ui) {
            video.muted = false;
            video.volume = (ui.value / 100);

            if (ui.value > 66) {
                $('.volume').attr('id', 'volume_100');
            }
            else if (ui.value > 33) {
                $('.volume').attr('id', 'volume_66');
            }
            else if (ui.value > 0) {
                $('.volume').attr('id', 'volume_33');
            }
            else {
                $('.volume').attr('id', 'muted');
            }

            volumeValue = ui.value;
        }
    });

    $('#Player').dblclick(function (e) {
        if (e.target.id !== "Player" && e.target.id !== "video")
            return;

        if (video.requestFullscreen) {
            if (!$(this).hasClass("fullscreen")) {
                video.requestFullscreen();
            }
            else {
                document.cancelFullscreen();
            }
        } else if (video.mozRequestFullScreen) {
            if (!$(this).hasClass("fullscreen")) {
                video.mozRequestFullScreen();
            }
            else {
                document.mozCancelFullScreen();
            }
        } else if (video.webkitRequestFullscreen) {
            if (!$(this).hasClass("fullscreen")) {
                video.webkitRequestFullscreen();
            }
            else {
                document.webkitExitFullscreen();
            }
        }
    });

    $('.fullscreen_btn').click(function () {
        if (video.requestFullscreen) {
            if (!$('#Player').hasClass("fullscreen")) {
                video.requestFullscreen();
            }
            else {
                document.cancelFullscreen();
            }
        } else if (video.mozRequestFullScreen) {
            if (!$('#Player').hasClass("fullscreen")) {
                video.mozRequestFullScreen();
            }
            else {
                document.mozCancelFullScreen();
            }
        } else if (video.webkitRequestFullscreen) {
            if (!$('#Player').hasClass("fullscreen")) {
                video.webkitRequestFullscreen();
            }
            else {
                document.webkitExitFullscreen();
            }
        }
    });

    if (document.addEventListener) {
        document.addEventListener('webkitfullscreenchange', fullscreenHandler, false);
        document.addEventListener('mozfullscreenchange', fullscreenHandler, false);
        document.addEventListener('fullscreenchange', fullscreenHandler, false);
        document.addEventListener('MSFullscreenChange', fullscreenHandler, false);
    }

    function fullscreenHandler() {
        if ($('.controls').hasClass('fullscreen_controls')) {
            $('.controls').attr('style', 'bottom: 35px;');
            $('.time_line').css('width', '71%');
            $('.controls').removeClass('fullscreen_controls');
        }
        else {
            $('.controls').attr('style', 'bottom: 0px;');
            $('.time_line').css('width', '83%');
            $('.controls').addClass('fullscreen_controls');
        }

        if (!$('#Player').hasClass('fullscreen')) {
            $('#Player').addClass('fullscreen');
        }
        else {
            $('#Player').removeClass('fullscreen');
        }
    }

    var animTrigger = false;

    $('#Player').mousemove(function () {
        $('#Player').removeClass('hide_cursor');

        timeout = 3;

        if ($('#Player').hasClass('playing')) {
            if (!$('#Player').hasClass('fullscreen')) {
                if ($(".controls").css('bottom') != "35px") {
                    if (!animTrigger) {
                        $(".controls").stop();
                        $(".controls").animate({
                            bottom: "35px"
                        }, {
                            duration: 250,
                            start: function () {
                                animTrigger = true;
                            },
                            complete: function () {
                                animTrigger = false;
                            }
                        });
                    }
                }
            }
            else {
                if ($(".controls").css('bottom') != "0px") {
                    if (!animTrigger) {
                        $(".controls").stop();
                        $(".controls").animate({
                            bottom: "0px"
                        }, {
                            duration: 250,
                            start: function () {
                                animTrigger = true;
                            },
                            complete: function () {
                                animTrigger = false;
                            }
                        });
                    }
                }
            }
        }
    });

    function hideControls() {
        hideVolume();
        $('.time_hover').hide(0);

        if ($('#Player').hasClass('playing')) {
            if (!$('#Player').hasClass('fullscreen')) {
                $(".controls").animate({
                    bottom: "5px"
                }, 250);
            }
            else {
                $(".controls").animate({
                    bottom: "-30px"
                }, 250);
            }
        }

        $('#Player').addClass('hide_cursor');
    }
});