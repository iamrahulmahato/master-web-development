class Minesweeper {
    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.board = [];
        this.gameOver = false;
        this.revealedCount = 0;
        this.flaggedCount = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.firstClick = true;
        this.difficulty = {
            easy: { rows: 8, cols: 8, mines: 10 },
            medium: { rows: 16, cols: 16, mines: 40 },
            hard: { rows: 16, cols: 30, mines: 99 }
        };

        this.initializeDOM();
        this.setupEventListeners();
        this.startNewGame();
    }

    initializeDOM() {
        this.gameBoard = document.getElementById('game-board');
        this.mineCountDisplay = document.getElementById('mine-count');
        this.timerDisplay = document.getElementById('timer');
        this.newGameBtn = document.getElementById('new-game-btn');
        this.modal = document.getElementById('game-over-modal');
        this.modalMessage = document.getElementById('game-over-message');
        this.modalStats = document.getElementById('game-over-stats');
        this.playAgainBtn = document.getElementById('play-again-btn');
        this.difficultySelect = document.getElementById('difficulty-select');
    }

    setupEventListeners() {
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
        this.playAgainBtn.addEventListener('click', () => this.startNewGame());
        this.difficultySelect?.addEventListener('change', (e) => this.changeDifficulty(e.target.value));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                this.startNewGame();
            }
        });
    }

    changeDifficulty(level) {
        const config = this.difficulty[level];
        if (config) {
            this.rows = config.rows;
            this.cols = config.cols;
            this.mines = config.mines;
            this.startNewGame();
        }
    }

    startNewGame() {
        this.gameOver = false;
        this.revealedCount = 0;
        this.flaggedCount = 0;
        this.firstClick = true;
        this.board = this.createBoard();
        this.renderBoard();
        this.updateMineCount();
        this.stopTimer();
        this.timerDisplay.textContent = 'Time: 0s';
        this.modal.style.display = 'none';
    }

    createBoard() {
        return Array.from({ length: this.rows }, () =>
            Array.from({ length: this.cols }, () => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                adjacentMines: 0
            }))
        );
    }

    renderBoard() {
        this.gameBoard.innerHTML = '';
        this.gameBoard.style.gridTemplateColumns = `repeat(${this.cols}, 30px)`;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', (e) => this.handleCellClick(e));
                cell.addEventListener('contextmenu', (e) => this.handleRightClick(e));
                cell.addEventListener('touchstart', (e) => this.handleTouchStart(e));
                cell.addEventListener('touchend', (e) => this.handleTouchEnd(e));
                this.gameBoard.appendChild(cell);
            }
        }
    }

    handleTouchStart(event) {
        event.preventDefault();
        this.touchStartTime = Date.now();
        this.touchTimer = setTimeout(() => {
            const cell = event.target;
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            this.toggleFlag(row, col);
        }, 500);
    }

    handleTouchEnd(event) {
        event.preventDefault();
        clearTimeout(this.touchTimer);
        if (Date.now() - this.touchStartTime < 500) {
            const cell = event.target;
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            this.handleCellClick({ target: cell });
        }
    }

    placeMines(excludeRow, excludeCol) {
        let minesToPlace = this.mines;
        while (minesToPlace > 0) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            if (!this.board[row][col].isMine && (row !== excludeRow || col !== excludeCol)) {
                this.board[row][col].isMine = true;
                minesToPlace--;
            }
        }
    }

    calculateAdjacentMines() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (!this.board[row][col].isMine) {
                    this.board[row][col].adjacentMines = this.countAdjacentMines(row, col);
                }
            }
        }
    }

    countAdjacentMines(row, col) {
        let count = 0;
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (this.isValidCell(r, c) && this.board[r][c].isMine) {
                    count++;
                }
            }
        }
        return count;
    }

    isValidCell(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    handleCellClick(event) {
        if (this.gameOver) return;
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (this.board[row][col].isFlagged) return;

        if (this.firstClick) {
            this.firstClick = false;
            this.placeMines(row, col);
            this.calculateAdjacentMines();
            this.startTimer();
        }

        this.revealCell(row, col);
    }

    handleRightClick(event) {
        event.preventDefault();
        if (this.gameOver) return;
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        this.toggleFlag(row, col);
    }

    toggleFlag(row, col) {
        const cell = this.board[row][col];
        if (cell.isRevealed) return;

        cell.isFlagged = !cell.isFlagged;
        this.flaggedCount += cell.isFlagged ? 1 : -1;
        this.updateMineCount();
        this.renderCell(row, col);

        if (this.checkWinCondition()) {
            this.endGame(true);
        }
    }

    checkWinCondition() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.board[row][col];
                if (cell.isMine && !cell. isFlagged) {
                    return false;
                }
                if (!cell.isMine && !cell.isRevealed) {
                    return false;
                }
            }
        }
        return true;
    }

    revealCell(row, col) {
        const cell = this.board[row][col];
        if (cell.isRevealed || cell.isFlagged) return;

        cell.isRevealed = true;
        this.revealedCount++;
        this.renderCell(row, col);

        if (cell.isMine) {
            this.endGame(false);
            return;
        }

        if (cell.adjacentMines === 0) {
            this.revealAdjacentCells(row, col);
        }

        if (this.checkWinCondition()) {
            this.endGame(true);
        }
    }

    revealAdjacentCells(row, col) {
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (this.isValidCell(r, c)) {
                    this.revealCell(r, c);
                }
            }
        }
    }

    renderCell(row, col) {
        const cellElement = this.gameBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const cell = this.board[row][col];

        if (cell.isRevealed) {
            cellElement.classList.add('revealed');
            if (cell.isMine) {
                cellElement.textContent = '💣';
            } else if (cell.adjacentMines > 0) {
                cellElement.textContent = cell.adjacentMines;
            }
        } else if (cell.isFlagged) {
            cellElement.textContent = '🚩';
        }
    }

    updateMineCount() {
        this.mineCountDisplay.textContent = `Mines: ${this.mines - this.flaggedCount}`;
    }

    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            this.timerDisplay.textContent = `Time: ${elapsedTime}s`;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    endGame(won) {
        this.gameOver = true;
        this.stopTimer();
        this.modal.style.display = 'block';
        this.modalMessage.textContent = won ? 'You Win!' : 'Game Over!';
        this.modalStats.textContent = `Time: ${this.timerDisplay.textContent} | Revealed: ${this.revealedCount}`;
        this.revealAllCells();
    }

    revealAllCells() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.revealCell(row, col);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const minesweeper = new Minesweeper(8, 8, 10);

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'n' || e.key === 'N') {
            minesweeper.startNewGame();
        }
    });

    // Add difficulty selector
    const difficultySelect = document.getElementById('difficulty-select');
    if (difficultySelect) {
        difficultySelect.addEventListener('change', (e) => {
            const difficulty = e.target.value;
            switch (difficulty) {
                case 'easy':
                    minesweeper.setDifficulty(8, 8, 10);
                    break;
                case 'medium':
                    minesweeper.setDifficulty(16, 16, 40);
                    break;
                case 'hard':
                    minesweeper.setDifficulty(16, 30, 99);
                    break;
            }
        });
    }

    // Add theme switcher
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });
    }

    // Add high scores
    const highScores = JSON.parse(localStorage.getItem('minesweeperHighScores')) || [];

    function updateHighScores(time, difficulty) {
        highScores.push({ time, difficulty });
        highScores.sort((a, b) => a.time - b.time);
        highScores.splice(10); // Keep only top 10 scores
        localStorage.setItem('minesweeperHighScores', JSON.stringify(highScores));
        displayHighScores();
    }

    function displayHighScores() {
        const highScoresList = document.getElementById('high-scores-list');
        if (highScoresList) {
            highScoresList.innerHTML = '';
            highScores.forEach((score, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${score.time}s (${score.difficulty})`;
                highScoresList.appendChild(li);
            });
        }
    }

    displayHighScores();

    // Extend Minesweeper class with new methods
    Minesweeper.prototype.setDifficulty = function(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.startNewGame();
    };

    Minesweeper.prototype.endGame = function(won) {
        this.gameOver = true;
        this.stopTimer();
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        
        if (won) {
            const difficulty = this.getDifficulty();
            updateHighScores(elapsedTime, difficulty);
        }

        this.modal.style.display = 'block';
        this.modalMessage.textContent = won ? 'You Win!' : 'Game Over!';
        this.modalStats.textContent = `Time: ${elapsedTime}s | Revealed: ${this.revealedCount}`;
        this.revealAllCells();
    };

    Minesweeper.prototype.getDifficulty = function() {
        if (this.rows === 8 && this.cols === 8 && this.mines === 10) return 'Easy';
        if (this.rows === 16 && this.cols === 16 && this.mines === 40) return 'Medium';
        if (this.rows === 16 && this.cols === 30 && this.mines === 99) return 'Hard';
        return 'Custom';
    };

    // Add custom board size input
    const customSizeForm = document.getElementById('custom-size-form');
    if (customSizeForm) {
        customSizeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const rows = parseInt(document.getElementById('custom-rows').value);
            const cols = parseInt(document.getElementById('custom-cols').value);
            const mines = parseInt(document.getElementById('custom-mines').value);
            if (rows > 0 && cols > 0 && mines > 0 && mines < rows * cols) {
                minesweeper.setDifficulty(rows, cols, mines);
            } else {
                alert('Invalid board size or number of mines');
            }
        });
    }

    // Add sound effects
    const soundToggle = document.getElementById('sound-toggle');
    let soundEnabled = localStorage.getItem('minesweeperSound') !== 'false';

    const sounds = {
        click: new Audio('click.mp3'),
        flag: new Audio('flag.mp3'),
        win: new Audio('win.mp3'),
        lose: new Audio('lose.mp3')
    };

    function playSound(sound) {
        if (soundEnabled) {
            sounds[sound].play();
        }
    }

    if (soundToggle) {
        soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            localStorage.setItem('minesweeperSound', soundEnabled);
            soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
        });
    }

    // Extend Minesweeper class to include sound effects
    const originalHandleCellClick = Minesweeper.prototype.handleCellClick;
    Minesweeper.prototype.handleCellClick = function(event) {
        originalHandleCellClick.call(this, event);
        playSound('click');
    };

    const originalToggleFlag = Minesweeper.prototype.toggleFlag;
    Minesweeper.prototype.toggleFlag = function(row, col) {
        originalToggleFlag.call(this, row, col);
        playSound('flag');
    };

    const originalEndGame = Minesweeper.prototype.endGame;
    Minesweeper.prototype.endGame = function(won) {
        originalEndGame.call(this, won);
        playSound(won ? 'win' : 'lose');
    };
});