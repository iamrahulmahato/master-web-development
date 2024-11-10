// Select elements
const habitInput = document.getElementById('habitInput');
const timeInput = document.getElementById('timeInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');
const quoteDisplay = document.getElementById('quote');

// Motivational quotes
const quotes = [
    "Consistency is key to success.",
    "Small habits make a big difference.",
    "Success is the sum of small efforts repeated day in and day out.",
    "The journey of a thousand miles begins with one step.",
    "It's not about having time, it's about making time."
];

// Load habits from local storage on page load
window.onload = function() {
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    savedHabits.forEach((habit) => {
        addHabitToDOM(habit.text, habit.time, habit.completed);
    });
    displayRandomQuote();
};

// Add habit event listener
addHabitBtn.addEventListener('click', () => {
    const habitText = habitInput.value.trim();
    const habitTime = timeInput.value.trim();

    if (habitText && habitTime) {
        addHabitToDOM(habitText, habitTime);
        saveHabit(habitText, habitTime, false);
        habitInput.value = '';
        timeInput.value = '';
    }
});

// Function to add a habit to the DOM
function addHabitToDOM(habitText, habitTime, isCompleted = false) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${isCompleted ? 'completed' : ''}">${habitText} (${habitTime} min)</span>
        <button class="delete-btn">Delete</button>
    `;

    // Toggle completion on habit click
    li.querySelector('span').addEventListener('click', () => {
        li.querySelector('span').classList.toggle('completed');
        updateHabitStatus(habitText);
    });

    // Delete habit on button click with confirmation
    li.querySelector('.delete-btn').addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this habit?")) {
            li.remove();
            deleteHabit(habitText);
        }
    });

    habitList.appendChild(li);
}

// Save habit to local storage
function saveHabit(text, time, completed) {
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    habits.push({ text, time, completed });
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

// Display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
}
