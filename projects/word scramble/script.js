let words = ["javascript", "computer", "developer", "keyboard", "internet", "university"];
let currentWord = "";
let scrambledWord = "";

function scrambleWord(word) {
    let wordArray = word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join("");
}

function newGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambledWord = scrambleWord(currentWord);
    document.getElementById("scrambledWord").textContent = scrambledWord;
    document.getElementById("resultMessage").textContent = "";
    document.getElementById("guessInput").value = "";
}

function checkGuess() {
    let userGuess = document.getElementById("guessInput").value.toLowerCase();
    if (userGuess === currentWord) {
        document.getElementById("resultMessage").textContent = "Correct! You guessed the word.";
        document.getElementById("resultMessage").style.color = "green";
    } else {
        document.getElementById("resultMessage").textContent = `Wrong! The correct word was: ${currentWord}`;
        document.getElementById("resultMessage").style.color = "red";
    }

    // Automatically start a new game after 1 seconds
    setTimeout(newGame, 1000);
}

// Start the game when the page loads
window.onload = newGame;
