// Select elements
const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

// Load habits from local storage on page load
window.onload = function() {
  const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
  savedHabits.forEach((habit) => {
    addHabitToDOM(habit.text, habit.completed);
  });
};

// Add habit event listener
addHabitBtn.addEventListener('click', () => {
  const habitText = habitInput.value.trim();
  if (habitText) {
    addHabitToDOM(habitText);
    saveHabit(habitText, false);
    habitInput.value = '';
  }
});

// Function to add a habit to the DOM
function addHabitToDOM(habitText, isCompleted = false) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="${isCompleted ? 'completed' : ''}">${habitText}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Toggle completion on habit click
  li.querySelector('span').addEventListener('click', () => {
    li.querySelector('span').classList.toggle('completed');
    updateHabitStatus(habitText);
  });

  // Delete habit on button click
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    deleteHabit(habitText);
  });

  habitList.appendChild(li);
}

// Save habit to local storage
function saveHabit(text, completed) {
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  habits.push({ text, completed });
  localStorage.setItem('habits', JSON.stringify(habits));
}

// Update habit status in local storage
function updateHabitStatus(habitText) {
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  const habit = habits.find((h) => h.text === habitText);
  if (habit) {
    habit.completed = !habit.completed;
    localStorage.setItem('habits', JSON.stringify(habits));
  }
}

// Delete habit from local storage
function deleteHabit(habitText) {
  let habits = JSON.parse(localStorage.getItem('habits')) || [];
  habits = habits.filter((h) => h.text !== habitText);
  localStorage.setItem('habits', JSON.stringify(habits));
}
