let currPlayer = 'X';
let GameStatus = '';
const boxes = document.querySelectorAll('.box');

const selectBox = (element) => {
    if (element.target.innerText === '') {
        element.target.innerText = currPlayer;
        if (!checkWinner()) { // Only switch player if no winner
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
            GameStatus = `${a} won`;
            setTimeout(() => {
                alert(GameStatus);
                resetGame();
            }, 100);
            return true; // Indicate that a winner was found
        }
    }

    // Check for tie condition
    if (Array.from(boxes).every(box => box.innerText !== '')) {
        setTimeout(() => {
            alert("It's a tie!");
            resetGame();
        }, 100);
        return true; // Indicate a tie
    }

    return false; // No winner or tie
}

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = '';
    });
    currPlayer = 'X'; // Reset to player X
    document.querySelector('#player').innerText = `${currPlayer}'s`; // Update player display
}

// Event listeners for boxes and reset button
boxes.forEach(box => {
    box.addEventListener('click', selectBox);
});

const reset = document.querySelector('#reset');
reset.addEventListener('click', resetGame);
