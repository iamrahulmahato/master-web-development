let currPlayer = 'X';
let GameStatus = '';
const boxes = document.querySelectorAll('.box');

const gameMessage = document.querySelector('#gameMessage');
const winSound = new Audio('win-sound1.wav'); // Add a sound file for victory

const selectBox = (element) => {
    if (element.target.innerText === '') {
        element.target.innerText = currPlayer;
        gameMessage.innerText = ''; // Clear any previous messages
        if (!checkWinner()) { 
            switchPlayer();
        }
    } else {
        alert('Already filled');
    }
}

const switchPlayer = () => {
    currPlayer = currPlayer === 'X' ? 'O' : 'X';
    document.querySelector('#player').innerText = `${currPlayer}'s`;
}

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

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = '';
    });
    currPlayer = 'X';
    document.querySelector('#player').innerText = `${currPlayer}'s`; 
    gameMessage.innerText = ''; // Clear any messages
    gameMessage.style.display = 'none'; // Hide the message
}


boxes.forEach(box => {
    box.addEventListener('click', selectBox);
});

const reset = document.querySelector('#reset');
reset.addEventListener('click', resetGame);
