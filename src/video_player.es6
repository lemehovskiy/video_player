/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/video_player
 */

'use strict';

(function ($) {

    class VideoPlayer {

        constructor(element, options) {

            let self = this;

            //extend by function call
            self.settings = $.extend(true, {

                test_property: false

            }, options);

            self.$element = $(element);

            //extend by data options
            self.data_options = self.$element.data('video-player');
            self.settings = $.extend(true, self.settings, self.data_options);

            self.state = {
                is_playing: false
            }

            self.$video = self.$element.find('video');

            self.$play_pause = self.$element.find('.play-pause');

            self.$progress = self.$element.find('.progress');
            self.$progress_bar = self.$element.find('.progress-bar');

            self.init();
        }

        init() {
            let self = this;

            self.$play_pause.on('click', function () {
                if (self.state.is_playing) {
                    self.state.is_playing = false;
                    self.pause();
                }
                else {
                    self.state.is_playing = true;
                    self.play();
                }
            })

            self.$video[0].addEventListener('loadedmetadata', function () {
                self.$progress.attr('max', self.$video[0].duration);
            });

            self.$video[0].addEventListener('timeupdate', function () {
                if (!self.$progress.attr('max')) {
                    self.$progress.attr('max', self.$video[0].duration);
                }
                self.$progress.value = self.$video[0].currentTime;
                self.$progress_bar[0].style.width = Math.floor((self.$video[0].currentTime / self.$video[0].duration) * 100) + '%';
            });


            self.$progress[0].addEventListener('click', function(e) {
                let pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;

                self.$video[0].currentTime = pos * self.$video[0].duration;
            });
        }


        play() {
            let self = this;

            self.$play_pause.addClass('play');
            self.$play_pause.removeClass('paused');

            self.$video[0].play();
        }

        pause() {
            let self = this;

            self.$play_pause.addClass('paused');
            self.$play_pause.removeClass('play');

            self.$video[0].pause();

        }
    }


    $.fn.videoPlayer = function () {
        let $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i,
            ret;
        for (i = 0; i < length; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                $this[i].video_player = new VideoPlayer($this[i], opt);
            else
                ret = $this[i].video_player[opt].apply($this[i].video_player, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };

})(jQuery);