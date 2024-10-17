const emojis = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥥'];
let gameBoard = document.getElementById('game-board');
let message = document.getElementById('message');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Double the emojis to create pairs
let emojiPairs = [...emojis, ...emojis];

// Shuffle the emojis
emojiPairs.sort(() => 0.5 - Math.random());

// Create cards and append them to the game board
emojiPairs.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

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

function checkForMatch() {
    lockBoard = true;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === emojis.length) {
            message.textContent = 'Congratulations! You matched all the pairs!';
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
