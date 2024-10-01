let board = document.getElementById('board');
let scoreEl = document.getElementById('score');
let startButton = document.getElementById('startButton');
let inputDirection = {x:0,y:0};
let snakeArray = [{x:9,y:0}, {x:8,y:0}]; // Initial snake at the top
let score = 0;
let food = {x:6,y:7};
let gameInterval;

function main() {
    gameEngine();
}

function isCollide(snake) {
    // Check for collision with itself
    for(let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // Check for collision with walls
    if(snake[0].x >= 18 || snake[0].y >= 18 || snake[0].x < 0 || snake[0].y < 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    if(isCollide(snakeArray)) {
        clearInterval(gameInterval);
        inputDirection = {x:0,y:0};
        board.style.backgroundColor = 'red'; // Change board color to red

        // Change the button text to "Game Over Play Again"
        startButton.innerHTML = "Game Over Play Again";
        startButton.style.display = "block"; // Show the button

        setTimeout(() => {
            resetGame(); // Reset the game after 2 seconds
            board.style.backgroundColor = '#222'; // Reset board color
        }, 2000);
        return;
    }

    // Check if the snake has eaten the food
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        score += 10;
        scoreEl.innerHTML = "SCORE : " + score;
        // Grow the snake by adding a new segment at the head
        snakeArray.unshift({x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y});
        placeFood(); // Place food at a new position
    } else {
        // Move the snake
        for (let i = snakeArray.length - 2; i >= 0; i--) {
            snakeArray[i + 1] = {...snakeArray[i]};
        }
    }
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;

    // Render the board
    renderBoard();
}

function renderBoard() {
    board.innerHTML = '';
    snakeArray.forEach((e) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y + 1; // Adjust for grid system
        snakeElement.style.gridColumnStart = e.x + 1; // Adjust for grid system
        snakeElement.classList.add('snake');
        snakeElement.innerHTML = '☠️'; // Snake segment
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.classList.add('food');
    foodElement.innerHTML = '🍔'; // Food
    board.appendChild(foodElement);
}

function placeFood() {
    let newFoodPosition;
    do {
        let a = 1, b = 16; // Random position range
        newFoodPosition = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
    } while (snakeArray.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y)); // Ensure food is not on the snake
    food = newFoodPosition;
}

function resetGame() {
    snakeArray = [{x:9,y:0}, {x:8,y:0}]; // Reset snake to the top
    score = 0;
    scoreEl.innerHTML = "SCORE : " + score;
    inputDirection = {x: 0, y: 0};
    startButton.innerHTML = "Start Game"; // Reset button text
}

// Slow down the snake by setting the interval to 300ms
startButton.addEventListener("click", () => {
    if (startButton.innerHTML === "Start Game") {
        inputDirection = {x: 1, y: 0}; // Start game moving to the right
    }
    startButton.style.display = "none"; // Hide the button during gameplay
    gameInterval = setInterval(main, 300); // Game runs at this interval
});

// Keyboard controls with arrow keys and 'wasd'
window.addEventListener("keydown", e => {
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
            if (inputDirection.y !== 1) { // Prevent going back
                inputDirection.x = 0;
                inputDirection.y = -1;
            }
            break;
        case 'ArrowDown':
        case 's':
            if (inputDirection.y !== -1) { // Prevent going back
                inputDirection.x = 0;
                inputDirection.y = 1;
            }
            break;
        case 'ArrowLeft':
        case 'a':
            if (inputDirection.x !== 1) { // Prevent going back
                inputDirection.x = -1;
                inputDirection.y = 0;
            }
            break;
        case 'ArrowRight':
        case 'd':
            if (inputDirection.x !== -1) { // Prevent going back
                inputDirection.x = 1;
                inputDirection.y = 0;
            }
            break;
        default: break;
    }
});

// Touch controls for mobile
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchmove", e => {
    if (!touchStartX || !touchStartY) return;

    let touchEndX = e.touches[0].clientX;
    let touchEndY = e.touches[0].clientY;

    let diffX = touchEndX - touchStartX;
    let diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0 && inputDirection.x !== -1) {
            inputDirection.x = 1; // Right swipe
            inputDirection.y = 0;
        } else if (diffX < 0 && inputDirection.x !== 1) {
            inputDirection.x = -1; // Left swipe
            inputDirection.y = 0;
        }
    } else {
        // Vertical swipe
        if (diffY > 0 && inputDirection.y !== -1) {
            inputDirection.x = 0;
            inputDirection.y = 1; // Down swipe
        } else if (diffY < 0 && inputDirection.y !== 1) {
            inputDirection.x = 0;
            inputDirection.y = -1; // Up swipe
        }
    }

    touchStartX = null;
    touchStartY = null;
});
