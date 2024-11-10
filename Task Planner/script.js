document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  let editMode = false;
  let editId = null;

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach((task) => displayTask(task));
  }

  function saveAllTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (editMode) {
      const index = tasks.findIndex((t) => t.id === editId);
      if (index !== -1) {
        tasks[index] = task;
      }
      editMode = false;
      editId = null;
    } else {
      tasks.push(task);
    }
    saveAllTasks(tasks);
  }

  function displayTask(task) {
    const taskItem = document.createElement("div");
    taskItem.className = "task";
    taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Due: ${task.date}</p>
        <button onclick="editTask('${task.id}')">Edit</button>
        <button onclick="deleteTask('${task.id}')">Delete</button>
      `;
    taskList.appendChild(taskItem);
  }

  window.editTask = function (id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((t) => t.id === id);
    if (task) {
      document.getElementById("task-title").value = task.title;
      document.getElementById("task-desc").value = task.description;
      document.getElementById("task-date").value = task.date;
      editMode = true;
      editId = id;
    }
  };

  window.deleteTask = function (id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveAllTasks(updatedTasks);
    loadTasks();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = {
      id: editMode ? editId : Date.now().toString(),
      title: document.getElementById("task-title").value,
      description: document.getElementById("task-desc").value,
      date: document.getElementById("task-date").value,
    };
    saveTask(task);
    loadTasks();
    form.reset();
  });

  loadTasks();
});
