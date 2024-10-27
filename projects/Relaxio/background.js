// background.js
let player = new Audio();
let tracks = ['audio/alb.mp3','audio/cbm.mp3','audio/clp.mp3','audio/fls.mp3','audio/lbf.mp3','audio/lgb.wav','audio/dft.mp3','audio/ssf.mp3','audio/ghf.mp3','audio/mgl.mp3']; // replace with your tracks
let currentTrackIndex = 0;
let repeat = false; // Repeat flag

player.addEventListener('ended', () => {
  if (repeat) {
    player.currentTime = 0;
    player.play();
  } else {
    nextTrack();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'togglePlay') {
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  } else if (request.command === 'prev') {
    prevTrack();
  } else if (request.command === 'next') {
    nextTrack();
  } else if (request.command === 'toggleRepeat') {
    repeat = !repeat; // Toggle repeat flag
  }
});


function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  player.src = tracks[currentTrackIndex];
  player.load(); // Load the new source
  player.play();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  player.src = tracks[currentTrackIndex];
  player.load(); // Load the new source
  player.play();
}
