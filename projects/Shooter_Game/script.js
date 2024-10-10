// Game Variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const bubbleRadius = 20;
const rows = 9;
const cols = 12;
let grid = [];
let score = 0;
let cannon = { x: canvas.width / 2, y: canvas.height - 30, angle: 0 };
let nextBubbleColor = randomColor(); // Color of the next bubble
let isGameOver = false;
let requestId;

// Set canvas dimensions to fully cover screen and make sure the top is visible
canvas.width = 480;
canvas.height = 640;

// Bubble class
class Bubble {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = bubbleRadius;
        this.gridPosition = null;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    checkCollision(otherBubble) {
        const dist = Math.hypot(this.x - otherBubble.x, this.y - otherBubble.y);
        return dist <= this.radius * 2;
    }

    snapToGrid() {
        const col = Math.floor(this.x / (2 * bubbleRadius));
        const row = Math.floor(this.y / (2 * bubbleRadius));
        this.gridPosition = { row, col };

        // Snap the bubble to its grid position
        this.x = col * bubbleRadius * 2 + bubbleRadius;
        this.y = row * bubbleRadius * 2 + bubbleRadius;

        if (!grid[row]) grid[row] = [];
        grid[row][col] = this;
    }
}

// Initialize grid
function initGrid() {
    grid = [];
    for (let row = 0; row < rows; row++) {
        grid[row] = [];
        for (let col = 0; col < cols; col++) {
            if (row < 5) {
                const color = randomColor();
                const bubble = new Bubble(col * 2 * bubbleRadius + bubbleRadius, row * 2 * bubbleRadius + bubbleRadius, color);
                grid[row][col] = bubble;
            }
        }
    }
}

// Game Functions
function init() {
    initGrid();
    score = 0;
    isGameOver = false;
    nextBubbleColor = randomColor(); // Set next bubble color
    document.getElementById("game-over").classList.add("hidden");
    resetCannon();
    gameLoop();
}

function resetCannon() {
    cannon.x = canvas.width / 2;
    cannon.y = canvas.height - 30;
}

function shootBubble() {
    const angle = cannon.angle;
    const speed = 5;
    const dx = Math.cos(angle) * speed;
    const dy = -Math.sin(angle) * speed;  // Reverse direction to move upwards
    const newBubble = new Bubble(cannon.x, cannon.y, nextBubbleColor); // Use the next bubble color

    // Update next bubble color
    nextBubbleColor = randomColor();

    // Add the new bubble drawing into the game loop
    const moveBubble = () => {
        if (!isGameOver) {
            newBubble.move(dx, dy);

            // Clear screen and redraw the game grid and cannon
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid();
            drawCannon();
            drawNextBubble(); // Draw next bubble

            // Draw the bubble as it's moving
            newBubble.draw();

            // Check collision with the grid or top boundary
            if (detectGridCollision(newBubble)) {
                newBubble.snapToGrid();
                checkForMatchingBubbles(newBubble.gridPosition.row, newBubble.gridPosition.col);
            } else if (newBubble.y - newBubble.radius <= 0) {
                newBubble.snapToGrid();
                checkForMatchingBubbles(newBubble.gridPosition.row, newBubble.gridPosition.col);
            } else {
                // Keep animating the bubble if no collision
                requestAnimationFrame(moveBubble);
            }
        }
    };

    requestAnimationFrame(moveBubble);
}

function detectGridCollision(bubble) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const otherBubble = grid[row][col];
            if (otherBubble && bubble.checkCollision(otherBubble)) {
                return true;
            }
        }
    }
    return false;
}

function checkForMatchingBubbles(row, col) {
    const bubble = grid[row][col];
    const color = bubble.color;

    const matchingBubbles = findMatchingBubbles(row, col, color);

    if (matchingBubbles.length >= 3) {
        matchingBubbles.forEach(({ row, col }) => {
            grid[row][col] = null; // Remove the bubble
            score += 10; // Update score
            updateScore();
        });
        // Clear bubbles that have been removed
        clearEmptyRows();
    }
}

function findMatchingBubbles(row, col, color, visited = new Set()) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return [];
    if (!grid[row][col] || grid[row][col].color !== color) return [];

    const key = `${row},${col}`;
    if (visited.has(key)) return [];

    visited.add(key);

    let matches = [{ row, col }];

    // Check all 4 directions (up, down, left, right)
    matches = matches.concat(findMatchingBubbles(row - 1, col, color, visited));
    matches = matches.concat(findMatchingBubbles(row + 1, col, color, visited));
    matches = matches.concat(findMatchingBubbles(row, col - 1, color, visited));
    matches = matches.concat(findMatchingBubbles(row, col + 1, color, visited));

    return matches;
}

function clearEmptyRows() {
    for (let row = rows - 1; row >= 0; row--) {
        if (grid[row].every(cell => cell === null)) {
            grid.splice(row, 1);
            grid.unshift(Array(cols).fill(null)); // Add a new empty row at the top
        }
    }
}

function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
}

function randomColor() {
    const colors = ["red", "blue", "green", "yellow", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function drawGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col]) grid[row][col].draw();
        }
    }
}

function drawCannon() {
    ctx.save();
    ctx.translate(cannon.x, cannon.y);
    ctx.rotate(cannon.angle);
    ctx.fillStyle = "#61dafb";
    ctx.fillRect(-10, -30, 20, 60);
    ctx.restore();
}

function drawNextBubble() {
    ctx.fillStyle = nextBubbleColor;
    ctx.beginPath();
    ctx.arc(cannon.x, cannon.y - 50, bubbleRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    cannon.angle = Math.atan2(cannon.y - mouseX, mouseX - cannon.x); // Adjust the angle to shoot upwards
}

function handleMouseClick() {
    if (!isGameOver) shootBubble();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawCannon();
    drawNextBubble(); // Draw next bubble

    if (!isGameOver) {
        requestId = requestAnimationFrame(gameLoop);
    }
}

// Event Listeners
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("click", handleMouseClick);
document.getElementById("reset-btn").addEventListener("click", init);

// Start the game
init();
