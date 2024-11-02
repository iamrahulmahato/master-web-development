// script.js
let userScore = 0;
let computerScore = 0;

const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultMessage = document.getElementById("result-message");

const choices = document.querySelectorAll(".choice");

// Function to randomly select Rock, Paper, or Scissors for the computer
function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)];
}

// Function to determine the winner of the game
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "draw";
    }
    if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "scissors" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        return "user";
    }
    return "computer";
}

// Update scores and display a result message
function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    if (winner === "user") {
        userScore++;
        resultMessage.textContent = `You win! ${userChoice} beats ${computerChoice}.`;
    } else if (winner === "computer") {
        computerScore++;
        resultMessage.textContent = `You lose! ${computerChoice} beats ${userChoice}.`;
    } else {
        resultMessage.textContent = `It's a draw! You both chose ${userChoice}.`;
    }

    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
}

// Event listeners for the choice buttons
choices.forEach(choice => {
    choice.addEventListener("click", () => playRound(choice.id));
});
