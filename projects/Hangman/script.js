const words = ["javascript", "hangman", "coding", "programming", "developer"];
let selectedWord;
let guessedLetters = [];
let remainingGuesses;
const maxGuesses = 6;

const wordContainer = document.getElementById("wordContainer");
const lettersContainer = document.getElementById("letters");
const messageDisplay = document.getElementById("message");
const guessesLeftDisplay = document.getElementById("guessesLeft");
const restartButton = document.getElementById("restartButton");

// Function to start a new game
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingGuesses = maxGuesses;

    wordContainer.innerHTML = "_ ".repeat(selectedWord.length);
    messageDisplay.textContent = "";
    guessesLeftDisplay.textContent = remainingGuesses;
    restartButton.classList.add("hidden");

    // Generate letter buttons
    lettersContainer.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letterButton = document.createElement("button");
        letterButton.textContent = String.fromCharCode(i);
        letterButton.classList.add("button");
        letterButton.addEventListener("click", () => guessLetter(letterButton.textContent.toLowerCase())); // Convert to lower case here
        lettersContainer.appendChild(letterButton);
    }
}

// Function to guess a letter
function guessLetter(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!selectedWord.includes(letter)) {
            remainingGuesses--;
        }
    }
    updateDisplay();
}

// Function to update the display
function updateDisplay() {
    // Update the word display
    wordContainer.innerHTML = selectedWord.split("").map(letter => {
        return guessedLetters.includes(letter) ? letter : "_";
    }).join(" ");

    // Update the number of guesses left
    guessesLeftDisplay.textContent = remainingGuesses;

    // Check if the game is over
    if (remainingGuesses === 0) {
        messageDisplay.textContent = `Game Over! The word was "${selectedWord}".`;
        disableButtons();
        restartButton.classList.remove("hidden");
    } else if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
        messageDisplay.textContent = "Congratulations! You've guessed the word!";
        disableButtons();
        restartButton.classList.remove("hidden");
    }
}

// Function to disable letter buttons
function disableButtons() {
    const buttons = lettersContainer.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Restart the game
restartButton.addEventListener("click", startGame);

// Start the first game
startGame();
