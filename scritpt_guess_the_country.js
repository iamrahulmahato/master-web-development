let hintsRevealed = 1;

function checkGuess() {
    const guess = document.getElementById('guess').value.toLowerCase();
    const result = document.getElementById('result');

    if (guess === 'india') {
        result.textContent = 'Correct! The country is India.';
        result.style.color = 'green';
    } else {
        result.textContent = 'Incorrect. Try again!';
        result.style.color = 'red';
    }
}

function revealHint() {
    hintsRevealed += 1;
    if (hintsRevealed <= 4) {
        document.getElementById(`hint${hintsRevealed}`).style.display = 'block';
    }
}
