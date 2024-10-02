const submitButton = document.querySelector(".form-todo");
const todoInput = document.querySelector(".form-todo input[type='text']");
const todoList = document.querySelector(".todo-list");

submitButton.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodoText = todoInput.value.trim();
  if (newTodoText) {
    const newLi = document.createElement("li");
    newLi.innerHTML = `
      <span class="task">${newTodoText}</span>
      <div class="todo-buttons">
        <button class="tick-btn">&#10003;</button>
        <button class="delete-btn">&#x1F5D1;</button>
      </div>
    `;
    todoList.append(newLi); // Only append when a todo is added
    todoInput.value = "";
  }
});

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
