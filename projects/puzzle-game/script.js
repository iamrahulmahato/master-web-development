const pieces = document.querySelectorAll('.puzzle-piece');
const dropzones = document.querySelectorAll('.dropzone');
const doneButton = document.getElementById('doneButton');
const resultMessage = document.getElementById('resultMessage');
const piecesContainer = document.querySelector('.pieces');
let draggedPiece = null;
let originContainer = null;  // Store the original container of the dragged piece

// Add drag event listeners to the puzzle pieces
pieces.forEach(piece => {
    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragend', dragEnd);
});

dropzones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', drop);
    zone.addEventListener('dragenter', dragEnter);
    zone.addEventListener('dragleave', dragLeave);
});

doneButton.addEventListener('click', checkResult);

// Shuffle pieces when the game starts
window.onload = function() {
    shufflePieces();
}

function shufflePieces() {
    // Convert NodeList to an array
    const piecesArray = Array.from(pieces);
    
    // Shuffle array using Fisher-Yates algorithm
    for (let i = piecesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [piecesArray[i], piecesArray[j]] = [piecesArray[j], piecesArray[i]];
    }

    // Append shuffled pieces back to the pieces container
    piecesArray.forEach(piece => {
        piecesContainer.appendChild(piece);
    });
}

function dragStart(event) {
    draggedPiece = this;
    originContainer = this.parentElement;  // Track the original container
    setTimeout(() => {
        this.classList.add('hidden');  // Hide the piece while dragging
    }, 0);
}

function dragEnd() {
    this.classList.remove('hidden');  // Show the piece after dragging
    draggedPiece = null;
    originContainer = null;  // Reset the origin container
}

function dragOver(event) {
    event.preventDefault();  // Allow dropping
}

function dragEnter(event) {
    this.classList.add('active');  // Highlight the drop zone on drag enter
}

function dragLeave() {
    this.classList.remove('active');  // Remove highlight when leaving the drop zone
}

function drop(event) {
    this.classList.remove('active');  // Remove highlight on drop

    if (this.children.length > 0) {
        // If there is already a piece in the drop zone, swap it with the dragged piece
        const existingPiece = this.children[0];

        // Move the existing piece to the origin container of the dragged piece
        originContainer.appendChild(existingPiece);
    }

    // Move the dragged piece into the drop zone
    this.appendChild(draggedPiece);

    // Reset the result message after any change to the puzzle
    resultMessage.textContent = "";
}

function checkResult() {
    let correctPieces = 0;

    dropzones.forEach(zone => {
        if (zone.children.length > 0 && zone.children[0].getAttribute('data-id') === zone.getAttribute('data-id')) {
            correctPieces++;
        }
    });

    if (correctPieces === dropzones.length) {
        resultMessage.textContent = "Hurray! You completed the puzzle!";
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = "Ouch! Try again?";
        resultMessage.style.color = "red";
    }
}
