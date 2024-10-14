let secretNumber = generateSecretNumber();
let guessHistory = [];
let guessCount = 0;
const maxGuesses = 10;

//validation for 4-digit guess
document.getElementById('guess-btn').addEventListener('click', () => {
    let userGuess = document.getElementById('guess-input').value;
    if (userGuess.length !== 4 || isNaN(userGuess)) {
        alert("Please enter a valid 4-digit number!");
        return;
    }

    guessCount++;
    let result = getCowsAndBulls(userGuess, secretNumber);
    displayResult(result, userGuess, guessCount);

    //logic for correct and incorrect guesses made
    if (result.bulls === 4) {
        triggerConfetti();
        document.getElementById('result').innerText = `Congratulations! You've guessed the secret number in ${guessCount} guesses!`;
        document.getElementById('guess-btn').disabled = true; 
    } else if (guessCount === maxGuesses) {
        document.getElementById('result').innerText = `Unfortunately, that was your last guess. The secret number was: ${secretNumber}`;
        document.getElementById('guess-btn').disabled = true; 
    }

    document.getElementById('guess-input').value = '';
});

document.getElementById('reset-btn').addEventListener('click', resetGame);

//generating 4-digit secret number
function generateSecretNumber() {
    let digits = [];
    while (digits.length < 4) {
        let randomDigit = Math.floor(Math.random() * 10);
        if (!digits.includes(randomDigit)) {
            digits.push(randomDigit);
        }
    }
    return digits.join('');
}

//keeping track of cows and bulls
function getCowsAndBulls(guess, secret) {
    let cows = 0, bulls = 0;
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }
    return { cows, bulls };
}

//generating a guess history after every attempt
function displayResult(result, userGuess, guessCount) {
    let resultMessage = `Guess ${guessCount}: ${userGuess} | Bulls: ${result.bulls}, Cows: ${result.cows}`;
    guessHistory.push(resultMessage);
    document.getElementById('history').innerHTML = guessHistory.map(item => `<div class="history-item">${item}</div>`).join('');
}

//reset button functionality
function resetGame() {
    secretNumber = generateSecretNumber();
    guessHistory = [];
    guessCount = 0;
    document.getElementById('result').innerText = '';
    document.getElementById('history').innerHTML = '';
    document.getElementById('guess-btn').disabled = false;
}

//confetti animation for when a correct guess is made
function triggerConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { particleCount: 100, spread: 70, origin: { y: 0.6 } };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
