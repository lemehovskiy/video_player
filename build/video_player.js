/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/video_player
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
  var VideoPlayer = function () {
    function VideoPlayer(element, options) {
      _classCallCheck(this, VideoPlayer);

      var self = this;

      //extend by function call
      self.settings = $.extend(true, {

        test_property: false

      }, options);

      self.$element = $(element);

      //extend by data options
      self.data_options = self.$element.data('video-player');
      self.settings = $.extend(true, self.settings, self.data_options);

      self.state = {
        is_playing: false,
        is_full_screen: false
      };

      self.$video = self.$element.find('video');

      self.$play_pause = self.$element.find('.play-pause');
      self.$full_screen = self.$element.find('.full-screen');

      self.$progress = self.$element.find('.progress');
      self.$progress_bar = self.$element.find('.progress-bar');

      self.init();
    }

    _createClass(VideoPlayer, [{
      key: 'init',
      value: function init() {
        var self = this;

        self.$play_pause.on('click', function () {
          if (self.state.is_playing) {
            self.state.is_playing = false;
            self.pause();
          } else {
            self.state.is_playing = true;
            self.play();
          }
        });

        self.$full_screen.on('click', function () {
          self.full_screen();
        });

        self.$video[0].addEventListener('loadedmetadata', function () {
          self.$progress.attr('max', self.$video[0].duration);
        });

        self.$video[0].addEventListener('timeupdate', function () {
          if (!self.$progress.attr('max')) {
            self.$progress.attr('max', self.$video[0].duration);
          }
          self.$progress.value = self.$video[0].currentTime;
          self.$progress_bar[0].style.width = Math.floor(self.$video[0].currentTime / self.$video[0].duration * 100) + '%';
        });

        self.$video[0].addEventListener('ended', function (e) {
          self.$video.trigger('ended.vp');
        });

        self.$progress[0].addEventListener('click', function (e) {
          var pos = (e.pageX - this.getBoundingClientRect().x) / this.offsetWidth;

          self.$video[0].currentTime = pos * self.$video[0].duration;
        });

        document.addEventListener('fullscreenchange', function (e) {
          self.update_full_screen_state();
        });
        document.addEventListener('webkitfullscreenchange', function () {
          self.update_full_screen_state();
        });
        document.addEventListener('mozfullscreenchange', function () {
          self.update_full_screen_state();
        });
        document.addEventListener('msfullscreenchange', function () {
          self.update_full_screen_state();
        });
      }
    }, {
      key: 'update_full_screen_state',
      value: function update_full_screen_state() {
        var self = this;

        if (self.state.is_full_screen) {
          self.$element.attr('data-is-full-screen', 'false');
          self.state.is_full_screen = false;
          self.$video.trigger('closeFullScreen.vp');
        } else {
          self.state.is_full_screen = true;
          self.$element.attr('data-is-full-screen', 'true');
          self.$video.trigger('openFullScreen.vp');
        }
      }
    }, {
      key: 'play',
      value: function play() {
        var self = this;

        self.$play_pause.addClass('play');
        self.$play_pause.removeClass('paused');

        self.$video[0].play();
      }
    }, {
      key: 'pause',
      value: function pause() {
        var self = this;

        self.$play_pause.addClass('paused');
        self.$play_pause.removeClass('play');

        self.$video[0].pause();
      }
    }, {
      key: 'full_screen',
      value: function full_screen() {
        var self = this;

        if (self.$element[0].requestFullscreen) {
          self.$element[0].requestFullscreen();
        } else if (self.$element[0].mozRequestFullScreen) {
          self.$element[0].mozRequestFullScreen();
        } else if (self.$element[0].webkitRequestFullScreen) {
          self.$video[0].webkitRequestFullScreen();
        } else if (self.$element[0].msRequestFullscreen) {
          self.$element[0].msRequestFullscreen();
        }
      }
    }]);

    return VideoPlayer;
  }();

  $.fn.videoPlayer = function () {
    var $this = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        length = $this.length,
        i = void 0,
        ret = void 0;
    for (i = 0; i < length; i++) {
      if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') $this[i].video_player = new VideoPlayer($this[i], opt);else ret = $this[i].video_player[opt].apply($this[i].video_player, args);
      if (typeof ret != 'undefined') return ret;
    }
    return $this;
  };
})(jQuery);

/***/ })
/******/ ]);