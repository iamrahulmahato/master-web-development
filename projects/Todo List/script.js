const submitButton = document.querySelector(".form-todo");
const todoInput = document.querySelector(".form-todo input[type='text']");
const todoList = document.querySelector(".todo-list");

submitButton.addEventListener("submit", (e) => {
    e.preventDefault(); // Important :- prevent the page from refreshing
    const newtodotext = todoInput.value;
    const newli = document.createElement("li");
    newli.innerHTML = `
    <span class="text">${newtodotext}</span>
    <div class="todo-button">
        <button class="todo-btn done">Done</button>
        <button class="todo-btn remove">Remove</button>
    </div>`;
    document.querySelector(".todo-list").append(newli);
    todoInput.value = "";
});

todoList.addEventListener("click",(e)=>{
    if(e.target.classList.contains("done")){
       const lispan = e.target.parentNode.previousElementSibling;
       lispan.style.textDecoration = "line-through";
    }
    if(e.target.classList.contains("remove")){
        const liItem = e.target.parentNode.parentNode;
        liItem.remove();
     }
});