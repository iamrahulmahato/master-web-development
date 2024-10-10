const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let brushColor = document.getElementById('colorPicker').value;
let brushSize = document.getElementById('brushSize').value;

// Resize canvas to fit window
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

// Start drawing
function startPosition(e) {
  painting = true;
  draw(e);
}

// Stop drawing
function endPosition() {
  painting = false;
  ctx.beginPath(); // Reset path for continuous drawing
}

// Get mouse position relative to canvas
function getMousePos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

// Draw on canvas
function draw(e) {
  if (!painting) return;

  const pos = getMousePos(canvas, e);
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = brushColor;

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

// Event listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Update brush color
document.getElementById('colorPicker').addEventListener('input', (e) => {
  brushColor = e.target.value;
});

// Update brush size
document.getElementById('brushSize').addEventListener('input', (e) => {
  brushSize = e.target.value;
});

// Clear canvas
document.getElementById('clearButton').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Resize the canvas on window resize
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial resize when page loads
