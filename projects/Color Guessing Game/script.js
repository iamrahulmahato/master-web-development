var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#color-display");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupMode();
    setupSquares();
    reset();
}

function setupMode() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            // Change numSquares based on mode
            numSquares = (this.textContent === "Easy") ? 3 : 6;
            reset();
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        // Add click event listeners to each square
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            
            // Check if clicked color matches the picked color
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again";
                changeColors(pickedColor);
            } else {
                this.style.backgroundColor = "#411530"; // Hide wrong squares
                messageDisplay.textContent = "Incorrect!    ";
                resetButton.textContent = "Try Again";
            }
        });
    }
}

resetButton.addEventListener("click", function() {
    reset();
});

function reset() {
    // Generate all new colors
    colors = genRandomColors(numSquares);
    // Pick a new random color
    pickedColor = chooseColor();
    // Change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    // Reset button text
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    // Update the colors of the squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }

    // Reset background color of header
    h1.style.backgroundColor = "#D1512D";
}

function changeColors(color) {
    // Loop through all squares to change their color to the correct one
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    h1.style.backgroundColor = color;
}

function chooseColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function genRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(makeColor());
    }
    return arr;
}

function makeColor() {
    // Generate a random RGB color
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}