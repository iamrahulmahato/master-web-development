// Variables to store game state
let playerScore = 0;
let aiScore = 0;
let wickets = 0;
let balls = 12;
let tossWinner = '';
let playerChoice = '';
let target = 0;
let secondInnings = false;

// DOM Elements
const tossSection = document.getElementById('toss-section');
const choiceSection = document.getElementById('choice-section');
const gameSection = document.getElementById('game-section');
const resultSection = document.getElementById('result-section');
const transitionMessageSection = document.getElementById('transition-message-section');
const tossResultDisplay = document.getElementById('toss-result');
const tossWinnerMessage = document.getElementById('toss-winner-message');
const scoreDisplay = document.getElementById('score-display');
const ballsDisplay = document.getElementById('balls-remaining');
const wicketsDisplay = document.getElementById('wickets');
const statusDisplay = document.getElementById('status');
const finalResult = document.getElementById('final-result');
const transitionMessage = document.getElementById('transition-message');

// Toss Section
document.getElementById('heads').addEventListener('click', () => handleToss('heads'));
document.getElementById('tails').addEventListener('click', () => handleToss('tails'));

function handleToss(playerCall) {
    const tossResult = Math.random() < 0.5 ? 'heads' : 'tails';
    tossResultDisplay.textContent = `Toss result: ${tossResult}`;

    if (playerCall === tossResult) {
        tossWinner = 'player';
        tossWinnerMessage.textContent = "You won the toss! Choose to bat or bowl.";
        choiceSection.style.display = 'block';
    } else {
        tossWinner = 'ai';
        aiChoosesBatBowl();
    }
    tossSection.style.display = 'none';
}

// AI's decision for bat/bowl
function aiChoosesBatBowl() {
    playerChoice = Math.random() < 0.5 ? 'bat' : 'bowl';
    tossWinnerMessage.textContent = `AI won the toss and chose to ${playerChoice === 'bat' ? 'bat' : 'bowl'} first.`;
    transitionToGame(playerChoice);
}

// Player chooses to bat or bowl
document.getElementById('bat').addEventListener('click', () => transitionToGame('bat'));
document.getElementById('bowl').addEventListener('click', () => transitionToGame('bowl'));

function transitionToGame(choice) {
    playerChoice = choice;
    choiceSection.style.display = 'none';
    transitionMessageSection.style.display = 'block';
    transitionMessage.textContent = `Get ready to ${choice === 'bat' ? 'bat' : 'bowl'}!`;
    setTimeout(() => {
        transitionMessageSection.style.display = 'none';
        gameSection.style.display = 'block';
        statusDisplay.textContent = `You are ${choice === 'bat' ? 'batting' : 'bowling'}!`;
    }, 2000);
}

// Main gameplay
document.querySelectorAll('.number-btn').forEach(button => {
    button.addEventListener('click', () => playTurn(parseInt(button.textContent)));
});

function playTurn(playerNumber) {
    const aiNumber = Math.floor(Math.random() * 6) + 1;
    balls--;
    ballsDisplay.textContent = `Balls Remaining: ${balls}`;

    if (!secondInnings) {
        if (playerChoice === 'bat') {
            playerBatting(playerNumber, aiNumber);
        } else {
            playerBowling(playerNumber, aiNumber);
        }
    } else {
        if (playerChoice === 'bat') {
            aiChasing(playerNumber, aiNumber);
        } else {
            playerChasing(playerNumber, aiNumber);
        }
    }
}

function playerBatting(playerNumber, aiNumber) {
    if (playerNumber === aiNumber) {
        wickets++;
        wicketsDisplay.textContent = `Wickets: ${wickets}/3`;
        if (wickets === 3 || balls === 0) {
            endFirstInnings();
        }
    } else {
        playerScore += playerNumber;
        scoreDisplay.textContent = `Your Score: ${playerScore}`;
    }
}

function playerBowling(playerNumber, aiNumber) {
    if (playerNumber === aiNumber) {
        wickets++;
        wicketsDisplay.textContent = `Wickets: ${wickets}/3`;
        if (wickets === 3 || balls === 0) {
            endFirstInnings();
        }
    } else {
        aiScore += aiNumber;
        scoreDisplay.textContent = `AI Score: ${aiScore}`;
    }
}

function endFirstInnings() {
    gameSection.style.display = 'none';
    transitionMessageSection.style.display = 'block';
    if (playerChoice === 'bat') {
        target = playerScore + 1;
        transitionMessage.textContent = `End of your innings. AI needs ${target} runs to win.`;
    } else {
        target = aiScore + 1;
        transitionMessage.textContent = `End of AI's innings. You need ${target} runs to win.`;
    }
    secondInnings = true;
    setTimeout(() => {
        transitionMessageSection.style.display = 'none';
        gameSection.style.display = 'block';
        statusDisplay.textContent = `You are now ${playerChoice === 'bat' ? 'bowling' : 'batting'}!`;
    }, 3000);
}

function playerChasing(playerNumber, aiNumber) {
    playerScore += playerNumber;
    scoreDisplay.textContent = `Your Score: ${playerScore}`;
    if (playerScore >= target) endGame();
}

function aiChasing(playerNumber, aiNumber) {
    aiScore += aiNumber;
    scoreDisplay.textContent = `AI Score: ${aiScore}`;
    if (aiScore >= target) endGame();
}

function endGame() {
    gameSection.style.display = 'none';
    resultSection.style.display = 'block';

    if (playerScore >= target) {
        finalResult.textContent = 'You won!';
    } else {
        finalResult.textContent = 'AI won!';
    }
}

// Restart game
document.getElementById('restart').addEventListener('click', () => location.reload());
