const toggleButton = document.getElementById('toggle-colorblind-mode');
const gameContainer = document.getElementById('game-container');

toggleButton.addEventListener('click', () => {
    gameContainer.classList.toggle('colorblind-mode');
});
