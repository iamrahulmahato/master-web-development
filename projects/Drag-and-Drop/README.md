# Dynamic To-Do List Application with Drag-and-Drop Functionality

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Objectives](#objectives)
- [Requirements](#requirements)
- [Technical Notes](#technical-notes)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
The Dynamic To-Do List application is designed to help users manage their tasks efficiently. This project implements drag-and-drop functionality for reordering task cards, allowing users to prioritize tasks intuitively. The application also persists the task order using localStorage, ensuring that users’ preferences are retained even after a page refresh.

## Features
- **Drag-and-Drop Functionality**: Users can click and drag task cards to reorder them within the same column.
- **Visual Feedback**: Provides immediate visual feedback during drag-and-drop actions, including highlighting the target position.
- **Persistent Order**: The updated order of tasks is saved in localStorage, preserving changes between sessions.

## Objectives
- Users should be able to drag a task card and drop it at a new position within the same column.
- The order of the tasks should update visually and in the data model.
- The new task order should persist even after a page refresh by storing the updated list in localStorage.

## Requirements
- Implement drag-and-drop functionality using the HTML5 Drag and Drop API.
- Create visual feedback for users, such as highlighting the target position while dragging.
- Update the task order in the data model when the user drops a task card in a new position.
- Store the updated task list in localStorage so that the order persists between sessions.

## Technical Notes
### Use the following events to handle drag-and-drop behavior:
- **dragstart**: Triggered when a drag operation starts; set the data being dragged.
- **dragover**: Triggered when an item is dragged over a valid drop target; prevent default behavior to allow dropping.
- **drop**: Triggered when the item is dropped; reorder the task cards based on the drop position.

### Visual Effects:
- Change the opacity of the dragged item to indicate it's being dragged.
- Highlight the target position using a placeholder or border to show where the task card will be dropped.

### Data Model Update:
- After a drop event, update the tasks array to reflect the new order in JavaScript.
- Ensure the updated order is immediately reflected in the HTML view.

### Persistence with localStorage:
- Save the updated tasks array to localStorage after a drop event.
- On page load, read the task order from localStorage to display tasks in the saved order.

## Installation
To get started with the Dynamic To-Do List application:

### Clone the Repository:
```bash
git clone https://github.com/iamrahulmahato/master-web-development.git
```

### Navigate to the Project Directory:
```bash
cd projects/Drag-and-Drop
```

### Open the index.html file in your browser to view the application.

## Usage
- **Reordering Tasks**: Click and drag any task card to reorder it as needed.
- **Refreshing the Page**: The order of tasks will persist even after refreshing the page.

## Code Structure
- **index.html**: The main HTML file containing the structure of the application.
- **style.css**: Contains styles for the task cards and visual feedback during dragging.
- **script.js**: JavaScript file implementing the drag-and-drop functionality and localStorage handling.

## Example Code Snippet
Here’s a simplified example of how drag-and-drop is implemented:
```javascript
// Drag event handlers
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function drop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
}
```

## Contributing
Contributions are welcome! If you'd like to contribute to the project, please fork the repository and create a pull request.

### Guidelines
- Ensure your code is well-documented and follows the project’s coding standards.
- Include tests for new features, if applicable.
- Update the README with details of changes to the project structure or any additional information.
***
### Give a star ⭐️ if this project helped you!
