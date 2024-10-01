document.getElementById('add-note').addEventListener('click', addNote);

function addNote() {
    const note = document.createElement('div');
    note.classList.add('note');

    const textarea = document.createElement('textarea');
    textarea.placeholder = "Write your note here...";

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-note');
    editButton.addEventListener('click', () => {
        if (textarea.disabled) {
            textarea.disabled = false; // Enable editing
            editButton.textContent = 'Save'; // Change button text to Save
        } else {
            textarea.disabled = true; // Disable editing
            editButton.textContent = 'Edit'; // Change button text back to Edit
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-note');
    deleteButton.addEventListener('click', () => {
        note.remove(); // Remove the note from the container
    });

    note.appendChild(textarea);
    note.appendChild(editButton);
    note.appendChild(deleteButton);

    document.getElementById('notes-container').appendChild(note);
}
