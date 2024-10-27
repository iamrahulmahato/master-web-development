// popup.js
document.getElementById('quoteButton').addEventListener('click', fetchQuote);
document.getElementById('imageButton').addEventListener('click', fetchImage);
document.getElementById('guessButton').addEventListener('click', playGame);
document.getElementById('resetButton').addEventListener('click', resetGame);

let secretNumber = Math.floor(Math.random() * 10) + 1;

async function fetchQuote() {
  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json();
  document.getElementById('quote').textContent = data.content;
}

async function fetchImage() {
  const response = await fetch('https://api.thecatapi.com/v1/images/search');
  const data = await response.json();
  document.getElementById('image').src = data[0].url;
}

function playGame() {
  const guess = document.getElementById('guess').value;
  if (!guess || guess < 1 || guess > 10) {
    document.getElementById('gameResult').textContent = 'Please enter a number between 1 and 10.';
    return;
  }
  if (guess == secretNumber) {
    document.getElementById('gameResult').textContent = 'Congratulations! You guessed the number!';
    secretNumber = Math.floor(Math.random() * 10) + 1; // Generate a new random number after a correct guess
  } else if (guess > secretNumber) {
    document.getElementById('gameResult').textContent = 'Too high, try again.';
  } else {
    document.getElementById('gameResult').textContent = 'Too low, try again.';
  }
}


function resetGame() {
  document.getElementById('guess').value = '';
  document.getElementById('gameResult').textContent = '';
}

document.getElementById('playButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({command: 'togglePlay'});
});

document.getElementById('prevButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({command: 'prev'});
});

document.getElementById('nextButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({command: 'next'});
});

document.getElementById('repeatButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({command: 'toggleRepeat'});
});
