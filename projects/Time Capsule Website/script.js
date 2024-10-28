document.getElementById('time-capsule-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('entry-title').value;
    const message = document.getElementById('entry-message').value;
    const imageInput = document.getElementById('entry-image');
    const entriesList = document.getElementById('entries-list');

    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');

    const entryTitle = document.createElement('h3');
    entryTitle.textContent = title;
    entryDiv.appendChild(entryTitle);

    const entryMessage = document.createElement('p');
    entryMessage.textContent = message;
    entryDiv.appendChild(entryMessage);

    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            entryDiv.appendChild(img);
        }
        reader.readAsDataURL(imageInput.files[0]);
    }

    // Append the new entry and add animation class
    entriesList.appendChild(entryDiv);
    entryDiv.classList.add('new-entry'); // Add a class for animation

    // Clear the form
    document.getElementById('time-capsule-form').reset();
});

// Optional: Remove the entry after a set timeout to create an animation effect
setTimeout(() => {
    const newEntries = document.querySelectorAll('.new-entry');
    newEntries.forEach(entry => {
        entry.classList.remove('new-entry'); // Remove animation class
    });
}, 500);
