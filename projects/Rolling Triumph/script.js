"use strict";

// Selecting elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const currScore0 = document.querySelector("#current--0");
const currScore1 = document.querySelector("#current--1");

const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
let scores, currentScore, activePlayer, playing;
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0; // Score of player 0 to 0
    score1.textContent = 0; // Score of player 1 to 0
    currScore0.textContent = 0; // Current score of player 0 to 0
    currScore1.textContent = 0; // Current score of player 1 to 0

    dice.classList.add("hidden");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
};

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
};

// Initializing the game
init();

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1. Generating random number
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        console.log(diceNumber);

        // 2. Display dice
        dice.classList.remove("hidden");
        dice.src = `./assets/dice-${diceNumber}.png`;

        // 3. Check for rolled 1
        if (diceNumber != 1) {
            // Add dice number to current score of active player
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

// Hold current score
btnHold.addEventListener("click", function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        // 2. Check if player's score is >= 100 -- Finsh the Game
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            dice.classList.add("hidden");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

// New Game
btnNew.addEventListener("click", init);
