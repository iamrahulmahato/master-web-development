let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 20;

document.querySelector('.btn_check').addEventListener('click', checkGuess);
document.querySelector('.btn_again').addEventListener('click', resetGame);

//Added event listener for 'Enter' key press
document.querySelector('.input_number').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

function checkGuess() {
    const guess = Number(document.querySelector('.input_number').value);
    if (!guess) {
        document.querySelector('.message').textContent = 'No Number!';
    } else if (guess < 1 || guess > 20) {
        document.querySelector('.message').textContent = 'Number should be between 1 and 20!';
    } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = 'Correct Number!';
        document.querySelector('.hide_num').textContent = secretNumber;
        if (score > highScore) {
            highScore = score;
            document.querySelector('.high_score').textContent = highScore;
        }
        celebrate();
        setTimeout(() => {
            resetGame();
        }, 4000);
    } else {
        if (score > 1) {
            document.querySelector('.message').textContent = guess > secretNumber ? 'Too High!' : 'Too Low!';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'You lost the game!';
            document.querySelector('.score').textContent = 0;
        }
    }
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 20) + 1;
    score = 20;
    document.querySelector('.score').textContent = score;
    document.querySelector('.message').textContent = 'Start Guessing..........';
    document.querySelector('.input_number').value = '';
    document.querySelector('.hide_num').textContent = '?';
    document.body.style.backgroundColor = '#222';
    document.querySelector('.container').style.backgroundColor = '#333';
}

function celebrate() {
    document.body.style.backgroundColor = '#60b347';
    document.querySelector('.container').style.backgroundColor = '#60b347';
    const celebration = document.createElement('div');
    celebration.classList.add('celebration');
    celebration.innerHTML = `
    <div class="sparkles">
    <div class="sparkle"></div>
    <div class="sparkle"></div>
    <div class="sparkle"></div>
    <div class="sparkle"></div>
    <div class="sparkle"></div>
    </div>
    `;
    document.body.appendChild(celebration);
    setTimeout(() => {
        document.body.removeChild(celebration);
    }, 2000);
}
