const playerButtons = document.querySelectorAll(".buttons button");
const computerButtons = document.querySelectorAll(".computer-buttons button");
const resultEl = document.getElementById("result");
const playerScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const roundNumberEl = document.getElementById("round-number");
const resetButton = document.getElementById("reset-button");

let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;
const winningScore = 5;

playerButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (playerScore < winningScore && computerScore < winningScore) {
            const playerChoice = button.id;
            const computerChoice = computerPlay();
            highlightComputerChoice(computerChoice);
            const result = playRound(playerChoice, computerChoice);
            resultEl.textContent = result;
            resultEl.classList.add("fade-in");
            setTimeout(() => resultEl.classList.remove("fade-in"), 500);
            updateScores();
            roundNumber++;
            roundNumberEl.textContent = `Round: ${roundNumber}`;
            checkWinner();
        }
    });
});

resetButton.addEventListener("click", resetGame);

function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    const randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}

function highlightComputerChoice(choice) {
    computerButtons.forEach(button => {
        if (button.id === `comp-${choice}`) {
            button.classList.add("glow");
        } else {
            button.classList.remove("glow");
        }
    });
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return `It's a tie! You both chose ${playerSelection}.`;
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        playerScore++;
        animateScore(playerScoreEl);
        return `You win! ${capitalize(playerSelection)} beats ${computerSelection}.`;
    } else {
        computerScore++;
        animateScore(computerScoreEl);
        return `You lose! ${capitalize(computerSelection)} beats ${playerSelection}.`;
    }
}

function updateScores() {
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}

function animateScore(scoreElement) {
    scoreElement.classList.add("score-animate");
    setTimeout(() => scoreElement.classList.remove("score-animate"), 300);
}

function checkWinner() {
    if (playerScore === winningScore) {
        resultEl.textContent = "Congratulations! You won the game!";
        disableButtons();
    } else if (computerScore === winningScore) {
        resultEl.textContent = "Oh no! The computer won the game.";
        disableButtons();
    }
}

function disableButtons() {
    playerButtons.forEach(button => {
        button.disabled = true;
    });
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;
    updateScores();
    roundNumberEl.textContent = `Round: ${roundNumber}`;
    resultEl.textContent = "";
    playerButtons.forEach(button => {
        button.disabled = false;
    });
    computerButtons.forEach(button => {
        button.classList.remove("glow");
    });
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}