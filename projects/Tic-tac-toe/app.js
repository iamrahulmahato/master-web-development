let currPlayer = 'X';
let GameStatus = '';
let isMultiplayer = false; // Track if the game is in multiplayer mode
const boxes = document.querySelectorAll('.box');

const gameMessage = document.querySelector('#gameMessage');
const winSound = new Audio('win-sound1.wav'); // Add a sound file for victory

// The winning line element to visually show the winning combination
const winningLine = document.createElement('div');
winningLine.id = 'winning-line';
winningLine.style.position = 'absolute'; // Set position to absolute
winningLine.style.height = '4px'; // Set the height of the line
winningLine.style.backgroundColor = '#45a049'; // Set the color of the winning line
winningLine.style.display = 'none'; // Initially hidden
document.body.appendChild(winningLine); // Append the winning line to the body

const slider = document.querySelector('.highlight'); // The slider highlight element

const selectBox = (element) => {
    if (element.target.innerText === '') {
        element.target.innerText = currPlayer;
        gameMessage.innerText = ''; // Clear any previous messages
        if (!checkWinner()) {
            switchPlayer();
            // If multiplayer, no need for AI move
            if (!isMultiplayer && currPlayer === 'O') { // If it's the AI's turn
                aiMove(); // Execute the AI's move
            }
        }
    } else {
        alert('Already filled');
    }
}

const switchPlayer = () => {
    currPlayer = currPlayer === 'X' ? 'O' : 'X'; // Toggle player
    updateSlider(); // Update slider position after player switch
};


const checkWinner = () => {
    const winningCombinations = [
        ['box1', 'box2', 'box3'],
        ['box4', 'box5', 'box6'],
        ['box7', 'box8', 'box9'],
        ['box1', 'box4', 'box7'],
        ['box2', 'box5', 'box8'],
        ['box3', 'box6', 'box9'],
        ['box1', 'box5', 'box9'],
        ['box3', 'box5', 'box7']
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination.map(id => document.querySelector(`#${id}`).innerText);
        if (a !== '' && a === b && a === c) {
            GameStatus = `${a} is the champion!`;
            winSound.play(); // Play win sound when a player wins
            displayMessage(GameStatus); // Display the win message in the center
            drawWinningLine(combination); // Draw the winning line
            setTimeout(() => resetGame(), 2000); // Reset after 2 seconds
            return true; 
        }
    }


    if (Array.from(boxes).every(box => box.innerText !== '')) {
        displayMessage("It's a tie!");
        winSound.play();
        setTimeout(() => resetGame(), 2000); // Reset after 2 seconds
        return true; 
    }

    return false; 
}

const displayMessage = (message) => {
    gameMessage.innerText = message; // Update message display
    gameMessage.style.color = '#2777b8'; // White text color
    gameMessage.style.backgroundColor = 'whitesmoke'; // A blue background for contrast
    gameMessage.style.padding = '20px'; // Add some padding for the message box
    gameMessage.style.borderRadius = '10px'; // Rounded corners
    gameMessage.style.fontSize = '2rem'; // Larger font size
    gameMessage.style.textAlign = 'center'; // Center text
    gameMessage.style.display = 'block'; // Ensure the message is shown
}


const drawWinningLine = (combination) => {
    const firstBox = document.querySelector(`#${combination[0]}`).getBoundingClientRect();
    const lastBox = document.querySelector(`#${combination[2]}`).getBoundingClientRect();

    const x1 = firstBox.left + firstBox.width / 2;
    const y1 = firstBox.top + firstBox.height / 2;
    const x2 = lastBox.left + lastBox.width / 2;
    const y2 = lastBox.top + lastBox.height / 2;

    const angle = Math.atan2(y2 - y1, x2 - x1);
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    winningLine.style.width = `${length}px`;
    winningLine.style.transform = `rotate(${angle}rad)`;
    winningLine.style.display = 'block';

    // Adjust position based on winning type
    if (combination[0] === combination[1] && combination[1] === combination[2]) { // Horizontal
        winningLine.style.top = `${firstBox.top + firstBox.height / 2 - 2}px`; // Centered above the row
        winningLine.style.left = `${firstBox.left}px`;
    } else if (combination[0] === combination[3] && combination[3] === combination[6]) { // Vertical
        winningLine.style.top = `${firstBox.top}px`;
        winningLine.style.left = `${firstBox.left + firstBox.width / 2 - 2}px`; // Centered in the column
    } else if (combination[0] === combination[4] && combination[4] === combination[8]) { // Diagonal \
        winningLine.style.top = `${firstBox.top}px`;
        winningLine.style.left = `${firstBox.left}px`;
        winningLine.style.transform = `rotate(45deg)`; // Adjust for diagonal \
    } else if (combination[2] === combination[4] && combination[4] === combination[6]) { // Diagonal /
        winningLine.style.top = `${firstBox.top}px`;
        winningLine.style.left = `${lastBox.left}px`;
        winningLine.style.transform = `rotate(-45deg)`; // Adjust for diagonal /
    }

    // Ensure the line is correctly centered
    const midPointX = (x1 + x2) / 2;
    const midPointY = (y1 + y2) / 2;

    winningLine.style.top = `${midPointY - 2}px`; // Adjust the Y position
    winningLine.style.left = `${midPointX - length / 2}px`; // Adjust the X position
}

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = '';
    });
    currPlayer = 'X';
    gameMessage.innerText = ''; // Clear any messages
    gameMessage.style.display = 'none'; // Hide the message
    winningLine.style.display = 'none'; // Hide the winning line
    updateSlider(); // Reset slider position
}

const updateSlider = () => {
    if (currPlayer === 'X') {
        slider.style.transform = 'translateX(0)'; // Move to X position
    } else {
        slider.style.transform = 'translateX(100%)'; // Move to O position
    }
}

const aiMove = () => {
    const winningCombinations = getWinningCombinations();

    // Check if AI can win in the next move
    for (const combination of winningCombinations) {
        if (canWin(combination, 'O')) {
            makeMove(combination.find(id => document.querySelector(`#${id}`).innerText === ''), 'O');
            return;
        }
    }

    // Check if the player can win in the next move and block them
    for (const combination of winningCombinations) {
        if (canWin(combination, 'X')) {
            makeMove(combination.find(id => document.querySelector(`#${id}`).innerText === ''), 'O');
            return;
        }
    }

    // Prefer center if available
    const centerBox = 'box5';
    if (document.querySelector(`#${centerBox}`).innerText === '') {
        makeMove(centerBox, 'O');
        return;
    }

    // Prefer corners
    const cornerBoxes = ['box1', 'box3', 'box7', 'box9'];
    const availableCorners = cornerBoxes.filter(corner => document.querySelector(`#${corner}`).innerText === '');
    if (availableCorners.length > 0) {
        const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        makeMove(randomCorner, 'O');
        return;
    }

    // Finally, choose any random available box
    const emptyBoxes = Array.from(boxes).filter(box => box.innerText === '');
    if (emptyBoxes.length > 0) {
        const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        makeMove(randomBox.id, 'O');
    }
}
const makeMove = (boxId, player) => {
    document.querySelector(`#${boxId}`).innerText = player;
    if (!checkWinner()) {
        switchPlayer(); // Switch player after AI move
    }
}
const canWin = (combination, player) => {
    const [a, b, c] = combination.map(id => document.querySelector(`#${id}`).innerText);
    return (a === player && b === player && c === '') ||
           (a === player && b === '' && c === player) ||
           (a === '' && b === player && c === player);
}

const getWinningCombinations = () => [
    ['box1', 'box2', 'box3'],
    ['box4', 'box5', 'box6'],
    ['box7', 'box8', 'box9'],
    ['box1', 'box4', 'box7'],
    ['box2', 'box5', 'box8'],
    ['box3', 'box6', 'box9'],
    ['box1', 'box5', 'box9'],
    ['box3', 'box5', 'box7']
];


// Add event listeners for boxes
boxes.forEach(box => {
    box.addEventListener('click', selectBox);
});

// Reset button event listener
document.querySelector('#reset').addEventListener('click', resetGame);

// Multiplayer button event listener
document.querySelector('#multiplayer').addEventListener('click', () => {
    isMultiplayer = !isMultiplayer; // Toggle multiplayer mode
    const modeText = isMultiplayer ? 'Multiplayer Mode' : 'Single Player Mode';
    alert(`Switched to ${modeText}`); // Alert the current mode
    resetGame(); // Reset the game when switching modes
});

// Initial slider position
updateSlider();