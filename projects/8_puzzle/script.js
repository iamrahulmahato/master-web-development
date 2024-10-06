document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle-button');
    const resetButton = document.getElementById('reset-button');
    const timerElement = document.getElementById('timer');
    
    let tiles = [...Array(9).keys()];
    let emptyIndex = 8;
    let timer;
    let startTime;

    // Function to create the puzzle tiles
    function createTiles() {
        puzzleContainer.innerHTML = '';  // Clear previous tiles
        tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.className = 'tile';
            if (tile === 8) {
                tileElement.classList.add('empty');  // Empty tile
            } else {
                tileElement.textContent = tile + 1;  // Numbered tile
                tileElement.addEventListener('click', () => moveTile(index));  // Tile click to move
            }
            puzzleContainer.appendChild(tileElement);  // Append the tile to container
        });
    }

    // Function to move the tile if possible
    function moveTile(index) {
        if (canMove(index)) {
            [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];  // Swap tiles
            emptyIndex = index;  // Update empty index
            createTiles();  // Re-render tiles
            if (isSolved()) {
                clearInterval(timer);  // Stop timer if solved
                alert(`Congratulations, you solved the puzzle in ${Math.floor((Date.now() - startTime) / 1000)} seconds!`);
            }
        }
    }

    // Function to check if a tile can move
    function canMove(index) {
        const emptyRow = Math.floor(emptyIndex / 3);
        const emptyCol = emptyIndex % 3;
        const row = Math.floor(index / 3);
        const col = index % 3;
        return (emptyRow === row && Math.abs(emptyCol - col) === 1) || (emptyCol === col && Math.abs(emptyRow - row) === 1);
    }

    // Function to shuffle the tiles
    function shuffleTiles() {
        do {
            for (let i = tiles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tiles[i], tiles[j]] = [tiles[j], tiles[i]];  // Shuffle logic
            }
        } while (isSolved());  // Ensure puzzle isn't solved after shuffle
        
        emptyIndex = tiles.indexOf(8);  // Update empty index
        createTiles();  // Recreate shuffled tiles
        
        resetTimer();  // Reset the timer after shuffling
        startTimer();  // Start the timer after the shuffle
    }

    // Function to reset the tiles and timer
    function resetTiles() {
        tiles = [...Array(9).keys()];  // Reset tiles to original order
        emptyIndex = 8;  // Reset empty tile index
        createTiles();  // Re-render tiles
        resetTimer();  // Reset the timer
    }

    // Function to check if the puzzle is solved
    function isSolved() {
        return tiles.every((tile, index) => tile === index);  // Check if tiles are in order
    }

    // Function to start the timer
    function startTimer() {
        resetTimer();  // Clear any existing timer before starting a new one
        startTime = Date.now();  // Get start time
        timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);  // Calculate elapsed time
            timerElement.textContent = `Time: ${elapsedTime}s`;  // Update timer display
        }, 1000);  // Update every second
    }

    // Function to reset the timer
    function resetTimer() {
        clearInterval(timer);  // Stop the previous timer interval
        timerElement.textContent = 'Time: 0s';  // Reset the displayed timer
    }

    // Event listeners for shuffle and reset buttons
    shuffleButton.addEventListener('click', shuffleTiles);
    resetButton.addEventListener('click', resetTiles);

    // Create initial tiles when page loads
    createTiles();
});
