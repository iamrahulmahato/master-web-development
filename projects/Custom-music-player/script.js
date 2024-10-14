const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const volumeControl = document.getElementById('volume-control');
const progressBar = document.getElementById('progress-bar');

const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
let currentSongIndex = 0;

function playSong() {
    audioPlayer.src = songs[currentSongIndex];
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
}

function pauseSong() {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶️';
}

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});
