const icons = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🍓", "🍑"];
let cards = [...icons, ...icons]; // Duplicate the icons to make pairs
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timerInterval;
let time = 0;

function startGame() {
    // Reset game state
    flippedCards = [];
    matchedCards = [];
    moves = 0;
    time = 0;
    clearInterval(timerInterval);
    document.getElementById('moves').textContent = moves;
    document.getElementById('timer').textContent = time;

    // Shuffle cards
    cards = cards.sort(() => Math.random() - 0.5);

    // Generate card elements
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear existing cards
    cards.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-icon', icon);
        card.onclick = () => flipCard(card);
        gameBoard.appendChild(card);
    });

    // Start the timer
    timerInterval = setInterval(() => {
        time++;
        document.getElementById('timer').textContent = time;
    }, 1000);
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    moves++;
    document.getElementById('moves').textContent = moves;

    const [card1, card2] = flippedCards;
    if (card1.getAttribute('data-icon') === card2.getAttribute('data-icon')) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            clearInterval(timerInterval);
            setTimeout(() => alert(`You won! Time: ${time} seconds, Moves: ${moves}`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

window.onload = startGame;
