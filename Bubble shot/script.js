const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let bubbles = [];
let bubbleSize = 30;
let gameInterval;

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

// Bubble class
class Bubble {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, bubbleSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Initialize game
function initGame() {
    score = 0;
    bubbles = [];
    document.getElementById('score').textContent = score;
    for (let i = 0; i < 10; i++) {
        let x = Math.random() * (canvas.width - bubbleSize * 2) + bubbleSize;
        let y = Math.random() * (canvas.height - bubbleSize * 2) + bubbleSize;
        let color = colors[Math.floor(Math.random() * colors.length)];
        bubbles.push(new Bubble(x, y, color));
    }
    draw();
}

// Draw bubbles and score
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(bubble => bubble.draw());
}

// Check for bubble hit
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    bubbles = bubbles.filter(bubble => {
        const distance = Math.sqrt((bubble.x - x) ** 2 + (bubble.y - y) ** 2);
        if (distance < bubbleSize) {
            score++;
            document.getElementById('score').textContent = score;
            return false; // Remove bubble
        }
        return true; // Keep bubble
    });

    draw();
});

// Start the game
document.getElementById('startButton').addEventListener('click', () => {
    initGame();
});
