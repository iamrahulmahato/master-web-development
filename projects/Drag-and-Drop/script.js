const draggableList = document.getElementById('draggable-list');
const checkButton = document.getElementById('check');
const hintButton = document.getElementById('hint');

// Predefined correct order of tasks for validation
const correctOrder = [
  'Make a list of 100+ JavaScript Projects',
  'Learn React',
  'Learn Node.js',
  'Learn Express.js',
  'Learn MongoDB',
  'Learn Python',
  'Learn Django',
  'Learn Flutter',
  'Learn Dart',
  'Learn Java'
];

let listItems = [];
let dragStartIndex;
let isHintShown = false; // State to track whether hint is displayed

// List of tasks as a simple array of strings to be rendered
let todoListItems = [
  'Make a list of 100+ JavaScript Projects',
  'Learn React',
  'Learn Node.js',
  'Learn Express.js',
  'Learn MongoDB',
  'Learn Python',
  'Learn Django',
  'Learn Flutter',
  'Learn Dart',
  'Learn Java'
];

// Function to create the list and render it to the DOM
function createList() {
  draggableList.innerHTML = ''; // Clear previous content
  listItems = [];

  todoListItems
    .map((task, index) => ({ task, index }))
    .forEach(({ task, index }) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.draggable = true;

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="task-name">${task}</p>
          <i class="fas fa-grip-lines"></i>
          <span class="hint correct-order" style="display: none;">Correct Order: ${correctOrder[index]}</span> <!-- Hidden by default -->
        </div>
      `;

      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

// Add drag and drop event listeners
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', drop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

// Drag event handlers
/**
 * Handles the drag start event.
 * Sets the dragStartIndex to the index of the closest 'li' element.
 *
 * @this {HTMLElement} The element that triggered the drag start event.
 */

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function drop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap list items
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);

  updateTaskOrderInArray();
}

// Update the order in the tasks array and save to localStorage
function updateTaskOrderInArray() {
  todoListItems = listItems.map((item) => item.querySelector('.task-name').innerText);
  localStorage.setItem('todoListItems', JSON.stringify(todoListItems));
}

// Load items from localStorage if available
function loadItemsFromLocalStorage() {
  const storedItems = JSON.parse(localStorage.getItem('todoListItems'));
  if (storedItems) {
    todoListItems = storedItems;
  }
}

function checkOrder() {
    let allCorrect = true; // Variable to track if all items are in correct position
  
    listItems.forEach((listItem, index) => {
      const taskName = listItem.querySelector('.task-name').innerText;
  
      // Remove any existing styles from previous checks
      listItem.classList.remove('correct', 'incorrect');
  
      // Check if the current task is in the correct position
      if (taskName === correctOrder[index]) {
        listItem.classList.add('correct'); 
      } else {
        listItem.classList.add('incorrect'); 
        allCorrect = false; // Set to false if any item is incorrect
      }
    });
  
    // Alert message if all items are in the correct position
    if (allCorrect) {
      alert("Congratulations! All items are in the correct position.");
    }
  }
  

// Show or hide the hint when the hint button is clicked
function toggleHint() {
  isHintShown = !isHintShown; 

  // Update button text based on the current state
  hintButton.innerText = isHintShown ? 'Hide Hint' : 'Show Hint';

  // Show or hide the correct order hints based on the state
  listItems.forEach((listItem) => {
    const hintElement = listItem.querySelector('.hint');
    if (isHintShown) {
      hintElement.style.display = 'block'; // Show hint
    } else {
      hintElement.style.display = 'none'; // Hide hint
    }
  });
}

// Event listeners for buttons
checkButton.addEventListener('click', checkOrder);
hintButton.addEventListener('click', toggleHint);

// Initial setup
loadItemsFromLocalStorage();
createList();
