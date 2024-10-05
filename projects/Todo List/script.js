const submitButton = document.querySelector(".form-todo");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const themeToggle = document.querySelector("#theme-toggle");

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

// Form submission for adding a new task
submitButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTodoText = todoInput.value.trim();
    const selectedPriority = document.querySelector("#priority").value; // Get the selected priority
    if (newTodoText) {
        const newLi = document.createElement("li");
        newLi.draggable = true; // Enable dragging
        newLi.innerHTML = `
            <span class="task">${newTodoText}</span>
            <select class="priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <div class="todo-buttons">
                <button class="tick-btn">&#10003;</button>
                <button class="delete-btn">&#x1F5D1;</button>
            </div>
        `;
        newLi.classList.add(`priority-${selectedPriority}`); // Set the initial priority class
        todoList.append(newLi);
        todoInput.value = "";

        // Update priority class based on selection
        const prioritySelect = newLi.querySelector(".priority");
        prioritySelect.addEventListener("change", (e) => {
            newLi.classList.remove('priority-low', 'priority-medium', 'priority-high');
            const priorityValue = e.target.value;
            newLi.classList.add(`priority-${priorityValue}`);
        });

        // Add drag events
        newLi.addEventListener("dragstart", () => {
            newLi.classList.add('dragging');
        });

        newLi.addEventListener("dragend", () => {
            newLi.classList.remove('dragging');
        });
    }
});

// Drag and drop functionality
todoList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    const siblings = [...todoList.querySelectorAll('li:not(.dragging)')];
    const nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.getBoundingClientRect().top + sibling.getBoundingClientRect().height / 2;
    });
    todoList.insertBefore(draggingItem, nextSibling);
});

// Event listener for tick and delete buttons
todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("tick-btn")) {
        const task = e.target.closest("li").querySelector(".task");
        task.classList.toggle("completed");
    }

    if (e.target.classList.contains("delete-btn")) {
        const li = e.target.closest("li");
        li.remove();
    }
});

//Pomodoro
function showCustomAlert(message) {
  const alertBox = document.getElementById('custom-alert');
  alertBox.textContent = message;
  alertBox.style.display = 'block';

  document.getElementById('alert-audio').play();

  // Hide the alert after 3 seconds
  setTimeout(() => {
      alertBox.style.display = 'none';
  }, 3000);
}

let timerInterval;
let isBreakTime = false;
let isLongBreak = false;
let pomodoroCount = 0;
let minutes = 25;
let seconds = 0;

const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.seconds');
const startButton = document.querySelector('.start-timer');
const pauseButton = document.querySelector('.pause-timer');
const resetButton = document.querySelector('.reset-timer');



// Function to show message alerts
function showAlert(message) {
  document.getElementById('alert-audio').play(); 
  alert(message);
}

function updateTimerDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval);
                pomodoroComplete();
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateTimerDisplay();
    }, 1000);
}

function pomodoroComplete() {
  pomodoroCount++;

  if (pomodoroCount % 4 === 0) {
      // After every 4 pomodoros, take a long break
      isLongBreak = true;
      minutes = 20;
      showCustomAlert("Good work, take a longer break now!");
  } else if (isBreakTime) {
      // After a short break, go back to work for 25 minutes
      isBreakTime = false;
      minutes = 25;
      showCustomAlert("Break completed, time to get back into focus!");
  } else {
      // After a work session, take a 5 minute break
      isBreakTime = true;
      minutes = 5;
      showCustomAlert("Focus session completed, take a break.");
  }

  seconds = 0;
  updateTimerDisplay();
  startTimer();  //Start next session
}

// Start button 
startButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    startTimer();
});

// Pause button
pauseButton.addEventListener('click', () => {
    clearInterval(timerInterval);
});

// Reset button
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    minutes = 25;
    seconds = 0;
    pomodoroCount = 0;
    isBreakTime = false;
    isLongBreak = false;
    updateTimerDisplay();
});
