document.addEventListener('DOMContentLoaded', () => {
    const wordSearchGrid = document.getElementById('wordSearchGrid');
    const wordsList = document.getElementById('wordsList');
    const resetButton = document.getElementById('resetButton');

    const words = ['EXPRESS','SQL','MONGODB', 'HTML', 'CSS', 'REACT', 'NODE'];
    const gridSize = 10;
    let selectedCells = [];
    let selectedWord = '';
    let grid = [];

    function createGrid() {
        grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
        placeWordsInGrid();
        fillEmptyCells();
        renderGrid();
    }

    function placeWordsInGrid() {
        words.forEach(word => {
            let placed = false;
            while (!placed) {
                const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                const row = Math.floor(Math.random() * gridSize);
                const col = Math.floor(Math.random() * gridSize);
                if (canPlaceWord(word, row, col, direction)) {
                    placeWord(word, row, col, direction);
                    placed = true;
                }
            }
        });
    }

    function canPlaceWord(word, row, col, direction) {
        if (direction === 'horizontal') {
            if (col + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[row][col + i] !== '') return false;
            }
        } else {
            if (row + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[row + i][col] !== '') return false;
            }
        }
        return true;
    }

    function placeWord(word, row, col, direction) {
        if (direction === 'horizontal') {
            for (let i = 0; i < word.length; i++) {
                grid[row][col + i] = word[i];
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                grid[row + i][col] = word[i];
            }
        }
    }

    function fillEmptyCells() {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (grid[row][col] === '') {
                    grid[row][col] = getRandomLetter();
                }
            }
        }
    }

    function renderGrid() {
        wordSearchGrid.innerHTML = '';
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement('div');
                cell.textContent = grid[row][col];
                cell.addEventListener('click', () => selectCell(cell, row, col));
                wordSearchGrid.appendChild(cell);
            }
        }
    }

    function getRandomLetter() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return letters[Math.floor(Math.random() * letters.length)];
    }

    function displayWords() {
        wordsList.innerHTML = '';
        words.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            wordsList.appendChild(li);
        });
    }

    function selectCell(cell, row, col) {
        if (!cell.classList.contains('found')) { // Ensure we don't select already found words
            cell.classList.add('selected');
            selectedCells.push(cell);
            selectedWord += cell.textContent;
            checkWord();
        }
    }

    function checkWord() {
        if (words.includes(selectedWord)) {
            alert(`You found the word: ${selectedWord}`);
            selectedCells.forEach(cell => {
                cell.classList.remove('selected'); // Remove selected class
                cell.classList.add('found'); // Add found class
            });
            resetSelection();
        }
    }

    function resetSelection() {
        selectedCells.forEach(cell => cell.classList.remove('selected'));
        selectedCells = [];
        selectedWord = '';
    }

    resetButton.addEventListener('click', () => {
        createGrid();
        displayWords();
        resetSelection();
    });

    createGrid();
    displayWords();
});
