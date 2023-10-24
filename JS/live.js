let theLive=document.querySelector(".live");

function getLive () {
    var player=videojs('hls-example');
    player.play();
}

getLive();