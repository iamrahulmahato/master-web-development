class PipeDreamGame {
    constructor() {
        this.gridSize = 6;
        this.score = 0;
        this.timeLeft = 60;
        this.timer = null;
        this.isGameRunning = false;

        this.initializeDOM();
        this.addEventListeners();
    }

    initializeDOM() {
        this.gameGrid = document.getElementById('gameGrid');
        this.scoreDisplay = document.getElementById('score');
        this.timeDisplay = document.getElementById('time');
        this.startButton = document.getElementById('startBtn');
        this.rotateButton = document.getElementById('rotateBtn');
        this.nextPiecePreview = document.getElementById('nextPiece');
        this.gameOverScreen = document.getElementById('gameOver');
        this.finalScoreDisplay = document.getElementById('finalScore');
        this.restartButton = document.getElementById('restartBtn');
    }

    addEventListeners() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.rotateButton.addEventListener('click', () => this.rotatePiece());
        this.restartButton.addEventListener('click', () => this.restartGame());
    }

    initializeGrid() {
        this.gameGrid.innerHTML = '';
        this.grid = [];

        for (let y = 0; y < this.gridSize; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.gridSize; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.addEventListener('click', () => this.placePiece(x, y));
                this.gameGrid.appendChild(cell);
                this.grid[y][x] = { element: cell, type: null };
            }
        }
    }

    startGame() {
        console.log('Game started');
        this.isGameRunning = true;
        this.score = 0;
        this.timeLeft = 60;
        this.scoreDisplay.textContent = this.score;
        this.timeDisplay.textContent = this.timeLeft;

        this.gameOverScreen.classList.add('hidden');
        this.initializeGrid();

        this.nextPiece = this.generatePiece();
        this.updateNextPiecePreview();

        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        this.timeLeft--;
        this.timeDisplay.textContent = this.timeLeft;
        if (this.timeLeft <= 0) this.gameOver();
    }

    generatePiece() {
        const types = ['straight', 'corner'];
        return types[Math.floor(Math.random() * types.length)];
    }

    updateNextPiecePreview() {
        this.nextPiecePreview.textContent = `Next: ${this.nextPiece}`;
    }

    placePiece(x, y) {
        if (!this.isGameRunning) return;
        const cell = this.grid[y][x];
        if (cell.type) return; // Prevent overwriting

        cell.type = this.nextPiece;
        cell.element.textContent = this.nextPiece;
        this.score++;
        this.scoreDisplay.textContent = this.score;

        this.nextPiece = this.generatePiece();
        this.updateNextPiecePreview();
    }

    rotatePiece() {
        console.log('Rotate piece'); // For future implementation
    }

    gameOver() {
        clearInterval(this.timer);
        this.isGameRunning = false;
        this.finalScoreDisplay.textContent = this.score;
        this.gameOverScreen.classList.remove('hidden');
    }

    restartGame() {
        this.startGame();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new PipeDreamGame();
});
