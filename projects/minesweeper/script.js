const gameBoard = document.getElementById('game-board');
const mineCountDisplay = document.getElementById('mine-count');
const timerDisplay = document.getElementById('timer');
const newGameButton = document.getElementById('new-game');
const startGameButton = document.getElementById('start-game');
const difficultySelect = document.getElementById('difficulty-select');

let board = [];
let mineCount = 0;
let timeElapsed = 0;
let timerInterval;
let gameOver = false;
let gameStarted = false;

const difficulties = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 }
};

let currentDifficulty = difficulties.medium;

function initializeGame() {
    gameOver = false;
    gameStarted = false;
    board = [];
    mineCount = currentDifficulty.mines;
    updateMineCount();
    timeElapsed = 0;
    clearInterval(timerInterval);
    timerDisplay.textContent = '000';
    
    gameBoard.innerHTML = '';
    gameBoard.style.pointerEvents = 'none';
    gameBoard.style.gridTemplateColumns = `repeat(${currentDifficulty.cols}, 30px)`;
    
    for (let i = 0; i < currentDifficulty.rows; i++) {
        board[i] = [];
        for (let j = 0; j < currentDifficulty.cols; j++) {
            board[i][j] = { isMine: false, revealed: false, flagged: false, adjacentMines: 0 };
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => revealCell(i, j));
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                flagCell(i, j);
            });
            gameBoard.appendChild(cell);
        }
    }
    
    startGameButton.style.display = 'inline-block';
    newGameButton.style.display = 'none';

    removeMessage();
}

function startGame() {
    if (gameStarted) return;
    
    gameStarted = true;
    gameBoard.style.pointerEvents = 'auto';
    placeMines();
    calculateAdjacentMines();
    startTimer();
    
    startGameButton.style.display = 'none';
    newGameButton.style.display = 'inline-block';
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < currentDifficulty.mines) {
        const row = Math.floor(Math.random() * currentDifficulty.rows);
        const col = Math.floor(Math.random() * currentDifficulty.cols);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }
}

function calculateAdjacentMines() {
    for (let i = 0; i < currentDifficulty.rows; i++) {
        for (let j = 0; j < currentDifficulty.cols; j++) {
            if (!board[i][j].isMine) {
                board[i][j].adjacentMines = countAdjacentMines(i, j);
            }
        }
    }
}

function countAdjacentMines(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < currentDifficulty.rows && newCol >= 0 && newCol < currentDifficulty.cols) {
                if (board[newRow][newCol].isMine) count++;
            }
        }
    }
    return count;
}

function revealCell(row, col) {
    if (gameOver || !gameStarted || board[row][col].revealed || board[row][col].flagged) return;
    
    board[row][col].revealed = true;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cell.classList.add('revealed');
    
    if (board[row][col].isMine) {
        gameOver = true;
        cell.classList.add('mine');
        showMessage('game-over-message', 'Game Over!');
        revealAllMines();
    } else {
        if (board[row][col].adjacentMines > 0) {
            cell.textContent = board[row][col].adjacentMines;
            cell.dataset.mines = board[row][col].adjacentMines;
        } else {
            revealAdjacentCells(row, col);
        }
    }
    
    checkWinCondition();
}

function revealAdjacentCells(row, col) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < currentDifficulty.rows && newCol >= 0 && newCol < currentDifficulty.cols) {
                if (!board[newRow][newCol].revealed && !board[newRow][newCol].flagged) {
                    revealCell(newRow, newCol);
                }
            }
        }
    }
}

function flagCell(row, col) {
    if (gameOver || !gameStarted || board[row][col].revealed) return;
    
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (board[row][col].flagged) {
        board[row][col].flagged = false;
        cell.classList.remove('flagged');
        mineCount++;
    } else {
        board[row][col].flagged = true;
        cell.classList.add('flagged');
        mineCount--;
    }
    updateMineCount();
}

function revealAllMines() {
    for (let i = 0; i < currentDifficulty.rows; i++) {
        for (let j = 0; j < currentDifficulty.cols; j++) {
            if (board[i][j].isMine) {
                const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                cell.classList.add('revealed', 'mine');
            }
        }
    }
}

function checkWinCondition() {
    let revealedCount = 0;
    for (let i = 0; i < currentDifficulty.rows; i++) {
        for (let j = 0; j < currentDifficulty.cols; j++) {
            if (board[i][j].revealed && !board[i][j].isMine) revealedCount++;
        }
    }
    if (revealedCount === (currentDifficulty.rows * currentDifficulty.cols) - currentDifficulty.mines) {
        gameOver = true;
        clearInterval(timerInterval);
        celebrateWin();
    }
}

function celebrateWin() {
    gameBoard.style.pointerEvents = 'none';
    showMessage('win-message', 'You Won!');

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }, 500);
}

function updateMineCount() {
    mineCountDisplay.textContent = mineCount.toString().padStart(3, '0');
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = timeElapsed.toString().padStart(3, '0');
    }, 1000);
}

function showMessage(className, text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.classList.add(className);
    gameBoard.appendChild(message);

    requestAnimationFrame(() => {
        message.classList.add('show');
    });
}

function removeMessage() {
    const message = gameBoard.querySelector('.game-over-message, .win-message');
    if (message) {
        message.remove();
    }
}

startGameButton.addEventListener('click', startGame);
newGameButton.addEventListener('click', initializeGame);

difficultySelect.addEventListener('change', () => {
    currentDifficulty = difficulties[difficultySelect.value];
    initializeGame();
});

initializeGame();