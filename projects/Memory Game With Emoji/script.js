const emojis = [
    '🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥥',
    '🍑', '🍊', '🍋', '🍈', '🍏', '🍐', '🍆', '🥭',
    '🍅', '🥑', '🍠', '🥔', '🌽', '🥕', '🧄', '🧅',
    '🍄', '🍞', '🥖', '🥯', '🧀', '🍖', '🍗', '🍔',
    '🍟', '🍕', '🌭', '🌮', '🌯', '🍣', '🍱', '🍜',
    '🍝', '🍧', '🍨', '🍦', '🎂', '🍰', '🧁', '🥧',
    '🍪', '🍫', '🍬', '🍭', '🍮', '🍯', '🥥', '🍼',
    '🍺', '🍻', '🥂', '🍷', '🍸', '🍹', '🍾', '🥃',
    '🧃', '🧊', '🍵', '☕', '🥤', '🍶', '🍸', '🧊'
  ];
   // Added more emojis for larger boards
let gameBoard = document.getElementById('game-board');
let message = document.getElementById('message');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let boardSize = 4; // Default 4x4
let cards = [];

// Get controls
const boardSizeSelector = document.getElementById('board-size');
const resetButton = document.getElementById('reset-btn');

// Reset game on page load or reset button
resetButton.addEventListener('click', resetGame);
boardSizeSelector.addEventListener('change', function() {
    boardSize = parseInt(this.value);
    resetGame();
});

// Reset the game
function resetGame() {
    gameBoard.innerHTML = ''; // Clear previous cards
    matchedPairs = 0;
    message.textContent = '';
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    setupBoard();
}

// Set up board based on selected size
function setupBoard() {
    let totalCards = boardSize * boardSize;
    let emojiPairs = [...emojis].slice(0, totalCards / 2); // Adjust emoji count
    cards = [...emojiPairs, ...emojiPairs];
    cards.sort(() => 0.5 - Math.random()); // Shuffle the emojis

    // Set grid size dynamically
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 80px)`; // Smaller tile size

    cards.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card logic
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.remove('hidden');
    this.textContent = this.dataset.emoji;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

// Check if cards match
function checkForMatch() {
    lockBoard = true;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === cards.length / 2) {
            message.textContent = 'Congratulations🥳! You matched all the pairs!';
        }
    } else {
        unflipCards();
    }
}

// Disable cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

// Reset card variables
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Start the game on page load
resetGame();
