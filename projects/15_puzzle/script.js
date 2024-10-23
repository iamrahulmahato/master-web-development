document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.querySelector('.puzzle-container');
    let tiles = Array.from(puzzleContainer.children);

    // Shuffle the tiles initially
    shuffleTiles();

    // Add click event listeners to all tiles
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const emptyTile = document.getElementById('empty');
            const tileIndex = tiles.indexOf(tile);
            const emptyIndex = tiles.indexOf(emptyTile);

            // Check if the tile clicked is adjacent to the empty tile
            if (isAdjacent(tileIndex, emptyIndex)) {
                swapTiles(tile, emptyTile);
                checkWinCondition(); // Check if the player has won after every move
            }
        });
    });

    // Shuffle tiles when button is clicked
    const shuffleButton = document.querySelector('.shuffle-button');
    shuffleButton.addEventListener('click', shuffleTiles);

    // Function to check if two tiles are adjacent
    function isAdjacent(tileIndex, emptyIndex) {
        const adjacentIndices = [
            emptyIndex - 1, // Left
            emptyIndex + 1, // Right
            emptyIndex - 4, // Up
            emptyIndex + 4  // Down
        ];
        return adjacentIndices.includes(tileIndex);
    }

    // Function to swap two tiles
    function swapTiles(tile1, tile2) {
        const tempHTML = tile1.innerHTML;
        tile1.innerHTML = tile2.innerHTML;
        tile2.innerHTML = tempHTML;

        // Also swap their IDs so 'empty' always stays correct
        const tempID = tile1.id;
        tile1.id = tile2.id;
        tile2.id = tempID;
    }

    // Shuffle function to randomly arrange tiles
    function shuffleTiles() {
        const tileNumbers = [...Array(16).keys()]; // 0-15 (0 is the empty tile)
        tileNumbers.sort(() => Math.random() - 0.5); // Shuffle the array

        tiles.forEach((tile, index) => {
            tile.id = tileNumbers[index] === 0 ? 'empty' : `tile${tileNumbers[index]}`;
            tile.innerHTML = tileNumbers[index] === 0 ? '' : tileNumbers[index];
        });
    }

    // Function to check if the player has won
    function checkWinCondition() {
        const currentOrder = tiles.map(tile => tile.innerHTML); // Get the current order of the tiles
        const correctOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '']; // Correct order with empty tile at the end

        if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
            alert('Congratulations, You Win!'); // Display a success message
        }
    }
});
function showRules() {
    document.getElementById('rules-modal').style.display = 'flex';
}

function closeRules() {
    document.getElementById('rules-modal').style.display = 'none';
}