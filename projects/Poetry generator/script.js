const phrases = [
    "The sun whispers secrets",
    "In the heart of the night",
    "Dreams dance like shadows",
    "The wind carries stories",
    "Stars twinkle with laughter",
    "Time flows like a river",
    "Love blooms in silence",
    "Hope glimmers in the dark"
];

document.getElementById('generate').addEventListener('click', generatePoem);

function generatePoem() {
    const randomLines = [];
    const numberOfLines = 4; // Number of lines in the poem

    for (let i = 0; i < numberOfLines; i++) {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        randomLines.push(phrases[randomIndex]);
    }

    document.getElementById('poem').innerText = randomLines.join('\n');
}
