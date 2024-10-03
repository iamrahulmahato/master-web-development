const submitButton = document.querySelector(".form-todo");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const themeToggle = document.querySelector("#theme-toggle");

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

// Form submission for adding a new task
submitButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTodoText = todoInput.value.trim();
    const selectedPriority = document.querySelector("#priority").value; // Get the selected priority
    if (newTodoText) {
        const newLi = document.createElement("li");
        newLi.draggable = true; // Enable dragging
        newLi.innerHTML = `
            <span class="task">${newTodoText}</span>
            <select class="priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <div class="todo-buttons">
                <button class="tick-btn">&#10003;</button>
                <button class="delete-btn">&#x1F5D1;</button>
            </div>
        `;
        newLi.classList.add(`priority-${selectedPriority}`); // Set the initial priority class
        todoList.append(newLi);
        todoInput.value = "";

        // Update priority class based on selection
        const prioritySelect = newLi.querySelector(".priority");
        prioritySelect.addEventListener("change", (e) => {
            newLi.classList.remove('priority-low', 'priority-medium', 'priority-high');
            const priorityValue = e.target.value;
            newLi.classList.add(`priority-${priorityValue}`);
        });

        // Add drag events
        newLi.addEventListener("dragstart", () => {
            newLi.classList.add('dragging');
        });

        newLi.addEventListener("dragend", () => {
            newLi.classList.remove('dragging');
        });
    }
});

// Drag and drop functionality
todoList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    const siblings = [...todoList.querySelectorAll('li:not(.dragging)')];
    const nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.getBoundingClientRect().top + sibling.getBoundingClientRect().height / 2;
    });
    todoList.insertBefore(draggingItem, nextSibling);
});

// Event listener for tick and delete buttons
todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("tick-btn")) {
        const task = e.target.closest("li").querySelector(".task");
        task.classList.toggle("completed");
    }

    if (e.target.classList.contains("delete-btn")) {
        const li = e.target.closest("li");
        li.remove();
    }
});
