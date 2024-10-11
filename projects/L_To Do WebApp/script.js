const tasksContainer = document.getElementById("tasks");

function addTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    if (title === "") {
        alert("Please enter a title for the task.");
        return;
    }

    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="task-actions">
            <button class="edit-button" onclick="editTask(this)">Edit</button>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
            <button class="done-button" onclick="markTaskAsDone(this)">Done</button>
        </div>
    `;

    tasksContainer.appendChild(task);

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
}

function editTask(button) {
    const task = button.parentElement.parentElement;
    const titleElement = task.querySelector("h3");
    const descriptionElement = task.querySelector("p");
    
    const title = titleElement.textContent;
    const description = descriptionElement.textContent;

    document.getElementById("taskTitle").value = title;
    document.getElementById("taskDescription").value = description;

    tasksContainer.removeChild(task);
}

function deleteTask(button) {
    const task = button.parentElement.parentElement;
    tasksContainer.removeChild(task);
}

function markTaskAsDone(button) {
    const task = button.parentElement.parentElement;
    const description = task.querySelector("p");

    if (description.style.textDecoration === "line-through") {
        description.style.textDecoration = "none";
        task.querySelector("h3").style.textDecoration = "none";
        task.style.boxShadow = "0 0 0 transparent";
    } else {
        description.style.textDecoration = "line-through";
        task.querySelector("h3").style.textDecoration = "line-through";
        task.style.boxShadow = "0 0 8px var(--done-button-box-color)"; 
    }
}
