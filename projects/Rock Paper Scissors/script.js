const buttons = document.querySelectorAll("button");

const resultEl = document.getElementById("result");

const playerScoreEl = document.getElementById("user-score");

const computerScoreEl = document.getElementById("computer-score");

let playerScore = 0;
let computerScore = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const computerSelection = computerPlay();
    const result = playRound(button.id, computerSelection);
    resultEl.textContent = result;

  });
});

function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  const randomChoice = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[randomChoice];
  const computerbuttons = document.querySelector('.computer-buttons');
  const selectedButton = computerbuttons.querySelector(`#${choices[randomChoice]}`);
  const allChildren = computerbuttons.querySelectorAll(':scope > *');
  const otherButtons = Array.from(allChildren).filter(child => child.id !== `${choices[randomChoice]}`);
  selectedButton.style.border = '3px solid black';
  otherButtons.map((button)=>{
    button.style.border = '0px';
  })
  return computerChoice;
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "It's a tie!";
  } else if (
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    return "You win! " + playerSelection + " beats " + computerSelection;
  } else {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    return "You lose! " + computerSelection + " beats " + playerSelection;
  }
}
