# 12-Piece Puzzle Game

An interactive 12-piece puzzle game where users drag and drop puzzle pieces to complete the image. The game provides feedback based on user performance and allows them to resubmit after making changes.

## Features

### 1. Drag and Drop Functionality
- Users can drag puzzle pieces from a container and drop them into designated drop zones.
- If a drop zone already contains a piece, the game automatically swaps the two pieces, making the interaction smooth.

### 2. Randomized Puzzle Pieces
On game start, the puzzle pieces in the container are shuffled using the Fisher-Yates algorithm. This ensures that each game presents a unique challenge.

### 3. Multiple Submissions
After placing all the pieces, users can click the "Done" button to check if they solved the puzzle correctly. If the arrangement is incorrect, users can make changes and resubmit without resetting the game.

### 4. Real-time Feedback
Once the user clicks the "Done" button, the game checks if the pieces are correctly placed:
- If correct: **"Hurray! You completed the puzzle!"** is displayed.
- If incorrect: **"Ouch! Try again?"** prompts the user to continue adjusting their pieces.

### 5. Smooth Piece Swapping
When a puzzle piece is dropped into a zone that already contains another piece, the two pieces are automatically swapped. This makes the game more intuitive and easier to play.

### 6. Reset Feedback After Changes
The result message is reset after every move, providing fresh feedback each time the user submits the puzzle.

## How to Play
1. Drag a puzzle piece from the container and drop it into the correct drop zone.
2. The game allows swapping, so if a piece is already in a zone, it will automatically swap with the new piece.
3. After arranging all pieces, click the "Done" button to check your result.
4. If the puzzle is correct, you will see a **"Hurray!"** message. If it’s incorrect, you’ll see **"Ouch! Try again?"**.
5. You can make changes and resubmit the puzzle as many times as you like until it is correct.

## Technologies Used
- **HTML** for structuring the game.
- **CSS** for styling the puzzle and layout.
- **JavaScript** for implementing the game logic, randomization, drag-and-drop functionality, and user feedback.

## Setup
1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. Play the game!
