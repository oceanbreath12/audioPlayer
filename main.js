
/* if('serviceWorker' in navigator){
 navigator.serviceWorker.register('/sw.js')
  .then((reg)=>console.log('service worker is registered', reg))
  .catch((err)=>console.log('service worker is NOT registered'. err))
}  */

var audio, context, analyser, src, array;



audio = document.getElementById("audio");






var context, analyser, src, array, logo;


var songs=["This is Shanghai.mp3", "Stive Morgan.mp3" ]

var songTitle=document.getElementById('songTitle');
var slider=document.getElementById('slider');
var currentTime=document.getElementById('currentTime');

var audio=document.getElementById('audio');

window.onload=loadSong;

function loadSong(){

audio.src="music/"+songs[currentSong];
songTitle.textContent=songs[currentSong];

canvas=document.getElementById('graph');
ctx=canvas.getContext('2d');





}

var currentSong=0;

function playPause(){
  
    if(!context){
        preparation();
    }

    if(audio.paused){
        audio.play();
        loop();
        document.getElementById('play').style.cssText = 'background-position: -258px -38px;';
        
    }else{
        audio.pause();
        document.getElementById('play').style.cssText = 'background-position: -8px -38px;';
    }
}


function preparation(){
    
    myElements=document.getElementsByClassName('column')
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    var bars=30;
    for(var i=0; i<bars; i++){
        bar_x=i*10;
        bar_width=5;
        bar_height=-(array[i]/2);
        var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(0, "#00FF00");
        my_gradient.addColorStop(1, "#191970");
        ctx.fillStyle = my_gradient;
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
    
   

    
}

setInterval(updateSongSlider, 1000);

function updateSongSlider(){
    var c=Math.round(audio.currentTime);
    slider.value=c;
    slider.setAttribute("max", audio.duration);
    var min=Math.floor(c/60);
    var sec=c%60;
    min=(min<10) ? "0" +min:min;
    sec=(sec<10) ? "0" +sec:sec;
    currentTime.textContent=min+":"+sec;

}


function next(){
    currentSong=currentSong + 1 % songs.length
    loadSong();
}

function  previous(){
    currentSong--;
    currentSong=(currentSong < 0) ? songs.length-1: currentSong;
    loadSong();
}




