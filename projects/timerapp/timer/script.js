let timerInterval;
let totalSeconds = 0;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const setTimerBtn = document.getElementById("setTimerBtn");
const setHours = document.getElementById("setHours");
const setMinutes = document.getElementById("setMinutes");
const setSeconds = document.getElementById("setSeconds");

function updateTimerDisplay() {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const secs = String(totalSeconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${hours}:${minutes}:${secs}`;
}

function checkTime() {
  if (totalSeconds <= 0) {
    clearInterval(timerInterval);
    alert("Time's up!");
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

setTimerBtn.addEventListener("click", () => {
  const hours = parseInt(setHours.value) || 0;
  const minutes = parseInt(setMinutes.value) || 0;
  const seconds = parseInt(setSeconds.value) || 0;

  totalSeconds = hours * 3600 + minutes * 60 + seconds;
  updateTimerDisplay();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

startBtn.addEventListener("click", () => {
  if (totalSeconds > 0) {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    timerInterval = setInterval(() => {
      totalSeconds--;
      updateTimerDisplay();
      checkTime();
    }, 1000);
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  totalSeconds = 0;
  updateTimerDisplay();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
