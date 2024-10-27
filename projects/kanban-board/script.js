// Function to add a new task to a specific column
function addTask(columnId) {
    const taskText = prompt("Enter task description:");
    if (taskText) {
        const task = document.createElement("div");
        task.className = "kanban-item";
        task.draggable = true;
        task.textContent = taskText;
        task.addEventListener("dragstart", dragStart);
        task.addEventListener("dragend", dragEnd);

        const column = document.getElementById(columnId).querySelector(".kanban-items");
        column.appendChild(task);
    }
}

// Drag and drop functions
let draggedTask = null;

function dragStart() {
    draggedTask = this;
    setTimeout(() => this.style.display = "none", 0);
}

function dragEnd() {
    setTimeout(() => {
        this.style.display = "block";
        draggedTask = null;
    }, 0);
}

// Handling drop events
document.querySelectorAll(".kanban-column").forEach(column => {
    column.addEventListener("dragover", (e) => e.preventDefault());

    column.addEventListener("drop", function () {
        const kanbanItems = this.querySelector(".kanban-items");
        if (draggedTask) {
            kanbanItems.appendChild(draggedTask);
        }
    });
});
