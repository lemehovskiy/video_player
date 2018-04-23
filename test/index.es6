require("./sass/style.scss");

require ("jquery");

require('../build/video_player.js');


$(document).ready(function () {

    $('.video-player-demo').videoPlayer();


    $('.video-player-demo').on('ended.vp', function(){
        alert('ended');
    });

});