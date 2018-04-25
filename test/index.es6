require("./sass/style.scss");

require("jquery");

require('../build/video_player.js');


$(document).ready(function () {

  $('.video-player-demo').videoPlayer();

  $('.video-player-demo').videoPlayer('play');



  $('.video-player-demo').on('ended.vp', function () {
    console.log('video ended');
  });

  $('.video-player-demo').on('closeFullScreen.vp', function () {
    console.log('close full screen')
  });
  $('.video-player-demo').on('openFullScreen.vp', function () {
    console.log('openFullScreen')
  });

  $('.video-player-demo').on('canplay.vp', function () {
    console.log('canplay')
  });

  $('.video-player-demo').on('loadstart.vp', function () {
    console.log('loadstart')
  });

});