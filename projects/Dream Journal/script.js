document.getElementById('dreamForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const dreamEntry = document.getElementById('dreamEntry').value;
    const dreamDate = document.getElementById('dreamDate').value;

    saveDream(dreamEntry, dreamDate);
    displayDreams();
    this.reset(); // Clear the form
});

function saveDream(entry, date) {
    const dreams = getDreams();
    dreams.push({ entry, date });
    localStorage.setItem('dreams', JSON.stringify(dreams));
}

function getDreams() {
    const dreams = localStorage.getItem('dreams');
    return dreams ? JSON.parse(dreams) : [];
}

function displayDreams() {
    const dreams = getDreams();
    const dreamList = document.getElementById('dreamList');
    dreamList.innerHTML = ''; // Clear current list

    dreams.forEach(dream => {
        const li = document.createElement('li');
        li.textContent = `${dream.date}: ${dream.entry}`;
        dreamList.appendChild(li);
    });
}

// Initial display
displayDreams();
