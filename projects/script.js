const words = ["JAVASCRIPT", "HTML", "CSS", "REACT", "NODE"];
const gridSize = 10;
const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

function generateGrid() {
    for (const word of words) {
        placeWord(word);
    }
    fillEmptyCells();
    renderGrid();
}

function placeWord(word) {
    let placed = false;
    while (!placed) {
        const direction = Math.floor(Math.random() * 2); // 0: horizontal, 1: vertical
        const startRow = Math.floor(Math.random() * gridSize);
        const startCol = Math.floor(Math.random() * gridSize);
        
        if (canPlaceWord(word, startRow, startCol, direction)) {
            for (let i = 0; i < word.length; i++) {
                if (direction === 0) {
                    grid[startRow][startCol + i] = word[i];
                } else {
                    grid[startRow + i][startCol] = word[i];
                }
            }
            placed = true;
        }
    }
}

function canPlaceWord(word, row, col, direction) {
    if (direction === 0 && col + word.length > gridSize) return false; // horizontal
    if (direction === 1 && row + word.length > gridSize) return false; // vertical

    for (let i = 0; i < word.length; i++) {
        const cell = direction === 0 ? grid[row][col + i] : grid[row + i][col];
        if (cell !== '' && cell !== word[i]) {
            return false;
        }
    }
    return true;
}

function fillEmptyCells() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === '') {
                grid[row][col] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            }
        }
    }
}

function renderGrid() {
    const wordSearchDiv = document.getElementById('word-search');
    wordSearchDiv.innerHTML = '';
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.innerText = cell;
            cellDiv.addEventListener('click', () => selectCell(rowIndex, colIndex));
            wordSearchDiv.appendChild(cellDiv);
        });
    });
    displayWordList();
}

function displayWordList() {
    const wordList = document.getElementById('word-list');
    wordList.innerHTML = '';
    words.forEach(word => {
        const li = document.createElement('li');
        li.innerText = word;
        wordList.appendChild(li);
    });
}

let selectedCells = [];

function selectCell(row, col) {
    const cellDivs = document.querySelectorAll('.cell');
    const index = row * gridSize + col;
    if (!selectedCells.includes(index)) {
        selectedCells.push(index);
        cellDivs[index].classList.add('selected');
    } else {
        selectedCells.splice(selectedCells.indexOf(index), 1);
        cellDivs[index].classList.remove('selected');
    }
    checkWord();
}

function checkWord() {
    const selectedWord = selectedCells.map(index => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        return grid[row][col];
    }).join('');

    if (words.includes(selectedWord)) {
        alert(`You found the word: ${selectedWord}`);
        resetSelection();
    }
}

function resetSelection() {
    selectedCells.forEach(index => {
        const cellDiv = document.querySelectorAll('.cell')[index];
        cellDiv.classList.remove('selected');
    });
    selectedCells = [];
}

document.getElementById('reset').addEventListener('click', () => {
    grid.forEach(row => row.fill(''));
    selectedCells = [];
    generateGrid();
});

// Start the game
generateGrid();
