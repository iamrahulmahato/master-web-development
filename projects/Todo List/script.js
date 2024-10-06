document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addTaskButton').addEventListener('click', addTask);
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            text: taskText,
            date: new Date(),
            completed: false
        };

        // Add task to the pending tasks list
        addTaskToList(task, 'pendingTasks');
        taskInput.value = '';
    }
}
function addTaskToList(task, listId) {
    const list = document.getElementById(listId);
    const listItem = document.createElement('li');

    const taskNumber = document.createElement('span');
    taskNumber.textContent = (list.children.length + 1) + '. '; // Incremental numbering

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
        completeTask(task, listId);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteTask(task, listId);
    });

    listItem.appendChild(taskNumber);
    listItem.appendChild(taskText);

    // Add "Complete" button for pending tasks only
    if (listId === 'pendingTasks') {
        listItem.appendChild(completeButton);
    }

    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
}


function toggleTaskStatus(task, listId) {
    task.completed = !task.completed;
    const list = document.getElementById(listId);

    // Remove task from the current list
    const listItem = findListItem(task, listId);
    listItem.remove();

    // Add task to the appropriate list
    const targetListId = task.completed ? 'completedTasks' : 'pendingTasks';
    addTaskToList(task, targetListId);
}

function completeTask(task, listId) {
    if (listId === 'pendingTasks') {
        const list = document.getElementById(listId);

        // Remove task from the current list
        const listItem = findListItem(task, listId);
        listItem.remove();

        // Add task to the completed tasks list
        addTaskToList(task, 'completedTasks');
    }

    // Ensure the checkbox is unchecked after completing the task
    task.completed = true;
    document.getElementById('taskInput').value = '';
}

function deleteTask(task, listId) {
    const list = document.getElementById(listId);

    // Remove task from the current list
    const listItem = findListItem(task, listId);
    listItem.remove();
}

function findListItem(task, listId) {
    const list = document.getElementById(listId);
    const listItems = list.getElementsByTagName('li');

    for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        if (listItem.containsText(task.text)) {
            return listItem;
        }
    }

    return null;
}

// Helper function to check if an element contains text
HTMLElement.prototype.containsText = function (text) {
    return this.innerText.toLowerCase().includes(text.toLowerCase());
};
