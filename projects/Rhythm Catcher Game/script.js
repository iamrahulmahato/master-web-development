const gameArea = document.querySelector('.game-area');
const catcher = document.querySelector('.catcher');
const notesContainer = document.querySelector('.notes-container');
const scoreElement = document.getElementById('score');
const comboElement = document.getElementById('combo');
const startButton = document.getElementById('start-btn');

let score = 0;
let combo = 0;
let gameInterval;

function startGame() {
  score = 0;
  combo = 0;
  scoreElement.textContent = score;
  comboElement.textContent = combo;
  startButton.disabled = true;
  notesContainer.innerHTML = '';
  gameArea.addEventListener('mousemove', moveCatcher);
  gameInterval = setInterval(createNote, 1000);
}

function moveCatcher(event) {
  const catcherWidth = catcher.offsetWidth;
  const gameAreaWidth = gameArea.offsetWidth;
  const mouseX = event.clientX - gameArea.getBoundingClientRect().left;
  const catcherX = mouseX - catcherWidth / 2;
  catcher.style.left = catcherX + 'px';
}

function createNote() {
  const note = document.createElement('div');
  note.classList.add('note');
  const noteX = Math.random() * (gameArea.offsetWidth - 20);
  note.style.left = noteX + 'px';
  notesContainer.appendChild(note);
  checkCatch(note);
}

function checkCatch(note) {
  const catcherRect = catcher.getBoundingClientRect();
  const noteRect = note.getBoundingClientRect();
  
  if (
    noteRect.bottom >= catcherRect.top &&
    noteRect.left >= catcherRect.left &&
    noteRect.right <= catcherRect.right
  ) {
    note.remove();
    score++;
    combo++;
    scoreElement.textContent = score;
    comboElement.textContent = combo;
  } else {
    setTimeout(() => {
      if (note.parentNode === notesContainer) {
        note.remove();
        combo = 0;
        comboElement.textContent = combo;
      }
    }, 2000);
  }
}

function endGame() {
  clearInterval(gameInterval);
  gameArea.removeEventListener('mousemove', moveCatcher);
  alert(`Game Over!\nScore: ${score}\nHighest Combo: ${combo}`);
  startButton.disabled = false;
}

startButton.addEventListener('click', startGame);