let timerInterval;
let seconds = 0;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

function updateTimerDisplay() {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${hours}:${minutes}:${secs}`;
}

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerInterval = setInterval(() => {
    seconds++;
    updateTimerDisplay();
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  seconds = 0;
  updateTimerDisplay();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
