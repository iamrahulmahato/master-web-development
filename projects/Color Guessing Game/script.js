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
    modeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            modeButtons.forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
            numSquares = this.textContent === "Easy" ? 3 : 6;
            reset();
        });
    });
}

function setupSquares() {
    squares.forEach(square => {
        square.addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again";
                changeColors(pickedColor);
            } else {
                this.style.backgroundColor = "#411530";
                messageDisplay.textContent = "Incorrect!";
            }
        });
    });
}

resetButton.addEventListener("click", reset);

function reset() {
    colors = genRandomColors(numSquares);
    pickedColor = chooseColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    squares.forEach((square, index) => {
        if (colors[index]) {
            square.style.display = "block";
            square.style.backgroundColor = colors[index];
        } else {
            square.style.display = "none";
        }
    });
    h1.style.backgroundColor = "#D1512D";
}

function changeColors(color) {
    squares.forEach(square => square.style.backgroundColor = color);
    h1.style.backgroundColor = color;
}

function chooseColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function genRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(makeColor());
    }
    return arr;
}

function makeColor() {
    return "rgb(" + 
        Math.floor(Math.random() * 256) + ", " + 
        Math.floor(Math.random() * 256) + ", " + 
        Math.floor(Math.random() * 256) + ")";
}
