// script.js

// Load sounds
const rain = new Audio('path/to/rain.mp3');
const fire = new Audio('path/to/fire.mp3');
const music = new Audio('path/to/lofi-music.mp3');
const birds = new Audio('path/to/birds.mp3');

rain.loop = true;
fire.loop = true;
music.loop = true;
birds.loop = true;

const sounds = {
    rain,
    fire,
    music,
    birds
};

document.getElementById('play').addEventListener('click', () => {
    for (let sound in sounds) {
        const checkbox = document.getElementById(sound);
        if (checkbox.checked) {
            sounds[sound].play();
        }
    }
});

document.getElementById('stop').addEventListener('click', () => {
    for (let sound in sounds) {
        sounds[sound].pause();
        sounds[sound].currentTime = 0; // Reset the sound
    }
});

document.getElementById('volume').addEventListener('input', (event) => {
    const volume = event.target.value;
    for (let sound in sounds) {
        sounds[sound].volume = volume;
    }
});
