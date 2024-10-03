document.getElementById('add-note').addEventListener('click', addNote);

function addNote() {
    const note = document.createElement('div');
    note.classList.add('note');
    //textarea implementation
    const textarea = document.createElement('textarea');
    textarea.placeholder = "Write your note here...";
    //edit button implementation
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-note');
    editButton.addEventListener('click', () => {
        if (textarea.disabled) {
            textarea.disabled = false; 
            editButton.textContent = 'Save'; 
        } else {
            textarea.disabled = true; 
            editButton.textContent = 'Edit'; 
        }
    });

    //delete button implementation
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-note');
    deleteButton.addEventListener('click', () => {
        note.remove(); 
    });
    //edit and appending 
    note.appendChild(textarea);
    note.appendChild(editButton);
    note.appendChild(deleteButton);

    document.getElementById('notes-container').appendChild(note);
}
