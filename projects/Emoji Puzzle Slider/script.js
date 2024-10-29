const gridContainer = document.querySelector('.grid-container');
const levelElement = document.getElementById('level');
const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');
const startButton = document.getElementById('start-button');

const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣'];
let level = 1;
let moves = 0;
let time = 0;
let timerId;

function createGrid(size) {
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  
  const tiles = [...emojis.slice(0, size * size - 1), ''];
  shuffle(tiles);
  
  tiles.forEach((emoji, index) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    if (emoji === '') {
      tile.classList.add('empty');
    } else {
      tile.textContent = emoji;
      tile.addEventListener('click', () => {
        moveTitle(index);
      });
    }
    gridContainer.appendChild(tile);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function moveTitle(index) {
  const tiles = Array.from(gridContainer.children);
  const size = Math.sqrt(tiles.length);
  const row = Math.floor(index / size);
  const col = index % size;
  const emptyIndex = tiles.findIndex(tile => tile.classList.contains('empty'));
  const emptyRow = Math.floor(emptyIndex / size);
  const emptyCol = emptyIndex % size;
  
  if (
    (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
    (col === emptyCol && Math.abs(row - emptyRow) === 1)
  ) {
    swapTiles(tiles[index], tiles[emptyIndex]);
    moves++;
    movesElement.textContent = moves;
    if (isGameOver(tiles)) {
      clearInterval(timerId);
      alert('Congratulations! You solved the puzzle!');
      nextLevel();
    }
  }
}

function swapTiles(tile1, tile2) {
  const temp = tile1.textContent;
  tile1.textContent = tile2.textContent;
  tile2.textContent = temp;
  tile1.classList.toggle('empty');
  tile2.classList.toggle('empty');
}

function isGameOver(tiles) {
  const size = Math.sqrt(tiles.length);
  const solution = emojis.slice(0, size * size - 1).concat('');
  return tiles.every((tile, index) => tile.textContent === solution[index]);
}

function updateTime() {
  time++;
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  timeElement.textContent = `${minutes}:${seconds}`;
}

function nextLevel() {
  level++;
  levelElement.textContent = level;
  moves = 0;
  movesElement.textContent = moves;
  time = 0;
  timeElement.textContent = '00:00';
  createGrid(level + 2);
}

function startGame() {
  level = 1;
  levelElement.textContent = level;
  moves = 0;
  movesElement.textContent = moves;
  time = 0;
  timeElement.textContent = '00:00';
  createGrid(3);
  timerId = setInterval(updateTime, 1000);
}

startButton.addEventListener('click', startGame);