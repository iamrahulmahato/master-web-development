document.getElementById('addHabitBtn').addEventListener('click', addHabit);

function addHabit() {
    const habitInput = document.getElementById('habitInput');
    const habitText = habitInput.value.trim();

    if (habitText) {
        const habitList = document.getElementById('habitList');
        const li = document.createElement('li');
        li.innerHTML = `
            ${habitText} <button onclick="removeHabit(this)">Remove</button>
        `;
        habitList.appendChild(li);
        habitInput.value = ''; // Clear input
    } else {
        alert('Please enter a habit!');
    }
}

function removeHabit(button) {
    const li = button.parentElement;
    li.remove();
}
