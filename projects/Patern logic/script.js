// script.js
const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF5733', '#33FF57', '#3357FF', '#FF33A1'];
let cards = [];
let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let lockBoard = false;

// Shuffle and initialize the game
function initializeGame() {
    cards = colors.sort(() => 0.5 - Math.random()).map(color => createCard(color));
    gameBoard.innerHTML = '';
    cards.forEach(card => gameBoard.appendChild(card));
    message.textContent = '';
}

// Create a card element
function createCard(color) {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.style.backgroundColor = color;
    card.addEventListener('click', flipCard);
    return card;
}

// Flip the card
function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.remove('hidden');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check for a match
function checkForMatch() {
    lockBoard = true;
    if (firstCard.style.backgroundColor === secondCard.style.backgroundColor) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            resetBoard();
        }, 1000);
    }
}

// Reset the board for the next turn
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    checkForWin();
}

// Check for win
function checkForWin() {
    const allMatched = [...gameBoard.children].every(card => card.classList.contains('matched'));
    if (allMatched) {
        message.textContent = 'Congratulations! You matched all patterns!';
    }
}

// Restart the game
restartBtn.addEventListener('click', initializeGame);
initializeGame();
