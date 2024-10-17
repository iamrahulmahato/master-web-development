const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("resetButton");

// Store dot positions
let dots = [];
let currentDot = 0;

// Initialize game
function initGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots = generateDots(5);
  drawDots();
  currentDot = 0;
}

// Generate random dots with numbering
function generateDots(numDots) {
  const dotPositions = [];
  for (let i = 1; i <= numDots; i++) {
    dotPositions.push({
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 40) + 20,
      label: i
    });
  }
  return dotPositions;
}

// Draw dots on the canvas
function drawDots() {
  dots.forEach(dot => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.font = "14px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(dot.label, dot.x, dot.y);
  });
}

// Check if the clicked dot is correct
function handleDotClick(event) {
  const { offsetX, offsetY } = event;
  const clickedDot = dots[currentDot];

  if (
    Math.hypot(clickedDot.x - offsetX, clickedDot.y - offsetY) <= 10
  ) {
    if (currentDot > 0) {
      const prevDot = dots[currentDot - 1];
      ctx.beginPath();
      ctx.moveTo(prevDot.x, prevDot.y);
      ctx.lineTo(clickedDot.x, clickedDot.y);
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    currentDot++;
    if (currentDot === dots.length) {
      setTimeout(() => alert("Congratulations! You completed the shape!"), 100);
    }
  }
}

canvas.addEventListener("click", handleDotClick);
resetButton.addEventListener("click", initGame);

initGame();