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

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong();
});

volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
});

audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
});
