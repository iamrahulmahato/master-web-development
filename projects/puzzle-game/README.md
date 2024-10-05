<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>12-Piece Puzzle Game - README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 5px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        h1, h2, h3 {
            color: #333;
        }
        code {
            background-color: #eee;
            padding: 2px 4px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div id="readme"></div>
    <script>
        const readmeContent = `
            <h1>12-Piece Puzzle Game</h1>
            <p>An interactive 12-piece puzzle game where users drag and drop puzzle pieces to complete the image. The game provides feedback based on user performance and allows them to resubmit after making changes.</p>
            <h2>Features</h2>
            <h3>1. Drag and Drop Functionality</h3>
            <ul>
                <li>Users can drag puzzle pieces from a container and drop them into designated drop zones.</li>
                <li>If a drop zone already contains a piece, the game automatically swaps the two pieces, making the interaction smooth.</li>
            </ul>
            <h3>2. Randomized Puzzle Pieces</h3>
            <p>On game start, the puzzle pieces in the container are shuffled using the Fisher-Yates algorithm. This ensures that each game presents a unique challenge.</p>            
            <h3>3. Multiple Submissions</h3>
            <p>After placing all the pieces, users can click the "Done" button to check if they solved the puzzle correctly. If the arrangement is incorrect, users can make changes and resubmit without resetting the game.</p>            
            <h3>4. Real-time Feedback</h3>
            <p>Once the user clicks the "Done" button, the game checks if the pieces are correctly placed:</p>
            <ul>
                <li>If correct: <strong>"Hurray! You completed the puzzle!"</strong> is displayed.</li>
                <li>If incorrect: <strong>"Ouch! Try again?"</strong> prompts the user to continue adjusting their pieces.</li>
                </ul>            
            <h3>5. Smooth Piece Swapping</h3>
            <p>When a puzzle piece is dropped into a zone that already contains another piece, the two pieces are automatically swapped. This makes the game more intuitive and easier to play.</p>
            <h3>6. Reset Feedback After Changes</h3>
            <p>The result message is reset after every move, providing fresh feedback each time the user submits the puzzle.</p>
 <h2>How to Play</h2>
            <ol>
                <li>Drag a puzzle piece from the container and drop it into the correct drop zone.</li>
                <li>The game allows swapping, so if a piece is already in a zone, it will automatically swap with the new piece.</li>
                <li>After arranging all pieces, click the "Done" button to check your result.</li>
                <li>If the puzzle is correct, you will see a <strong>"Hurray!"</strong> message. If it’s incorrect, you’ll see <strong>"Ouch! Try again?"</strong>.</li>
                <li>You can make changes and resubmit the puzzle as many times as you like until it is correct.</li>
            </ol>
            <h2>Technologies Used</h2>
            <ul>
                <li><strong>HTML</strong> for structuring the game.</li>
                <li><strong>CSS</strong> for styling the puzzle and layout.</li>
                <li><strong>JavaScript</strong> for implementing the game logic, randomization, drag-and-drop functionality, and user feedback.</li>
            </ul>
            <h2>Setup</h2>
            <ol>
                <li>Clone the repository.</li>
                <li>Open <code>index.html</code> in any modern web browser.</li>
                <li>Play the game!</li>
            </ol>
        `;
        document.getElementById("readme").innerHTML = readmeContent;
    </script>
</body>
</html>
