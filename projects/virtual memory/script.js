document.getElementById('addMemory').addEventListener('click', function() {
    const memoryInput = document.getElementById('memoryInput');
    const memoryText = memoryInput.value.trim();

    if (memoryText) {
        addMemoryToJar(memoryText);
        memoryInput.value = ''; // Clear the input
    } else {
        alert('Please enter a memory!');
    }
});

function addMemoryToJar(memory) {
    const memoryList = document.getElementById('memoryList');
    
    // Create memory item
    const memoryItem = document.createElement('div');
    memoryItem.classList.add('memory-item');

    // Add memory text
    const memoryText = document.createElement('span');
    memoryText.textContent = memory;
    memoryItem.appendChild(memoryText);

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        memoryList.removeChild(memoryItem);
    });
    memoryItem.appendChild(deleteButton);

    // Append to memory list
    memoryList.appendChild(memoryItem);
}
