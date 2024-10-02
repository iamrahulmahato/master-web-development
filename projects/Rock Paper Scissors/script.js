const computer = document.querySelector(".computer img");
const player = document.querySelector(".player img");
const computerPoints = document.querySelector(".computerPoints");
const playerPoints = document.querySelector(".playerPoints");
const options = document.querySelectorAll(".options button");

options.forEach((option) => {
  option.addEventListener("click", () => {
    computer.classList.add("shakeComputer");
    player.classList.add("shakePlayer");

    setTimeout(() => {
      computer.classList.remove("shakeComputer");
      player.classList.remove("shakePlayer");

      player.src = "./" + option.innerHTML + "Player.png";

      const choice = ["STONE", "PAPER", "SCISSORS"];
      let arrayNo = Math.floor(Math.random() * 3);
      let computerChoice = choice[arrayNo];
      computer.src = "./" + computerChoice + "Computer.png";

      let cPoints = parseInt(computerPoints.innerHTML);
      let pPoints = parseInt(playerPoints.innerHTML);

      if (option.innerHTML === "STONE") {
        if (computerChoice === "PAPER")
          computerPoints.innerHTML = cPoints + 1;
        else if (computerChoice === "SCISSORS")
          playerPoints.innerHTML = pPoints + 1;
      } else if (option.innerHTML === "PAPER") {
        if (computerChoice === "SCISSORS")
          computerPoints.innerHTML = cPoints + 1;
        else if (computerChoice === "STONE")
          playerPoints.innerHTML = pPoints + 1;
      } else {
        if (computerChoice === "STONE")
          computerPoints.innerHTML = cPoints + 1;
        else if (computerChoice === "PAPER")
          playerPoints.innerHTML = pPoints + 1;
      }
    }, 900);
  });
});