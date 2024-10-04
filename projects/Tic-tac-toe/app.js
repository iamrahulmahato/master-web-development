let currPlayer = "X";
let GameStatus = "";
const boxes = document.querySelectorAll(".box");
const winnerDisp = document.querySelector("#winner-display");

const selectBox = (element) => {
    if (element.target.innerText === "") {
        element.target.innerText = currPlayer;
        if (!checkWinner()) {
            // Only switch player if no winner
            switchPlayer();
        }
    } else {
        winnerDisp.innerText = "Already filled";
        setTimeout(() => {
            winnerDisp.innerText = "";
        }, 1000);
    }
};

const switchPlayer = () => {
    currPlayer = currPlayer === "X" ? "O" : "X";
    document.querySelector("#player").innerText = `${currPlayer}'s`;
};

const checkWinner = () => {
    const winningCombinations = [
        ["box1", "box2", "box3"],
        ["box4", "box5", "box6"],
        ["box7", "box8", "box9"],
        ["box1", "box4", "box7"],
        ["box2", "box5", "box8"],
        ["box3", "box6", "box9"],
        ["box1", "box5", "box9"],
        ["box3", "box5", "box7"],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination.map(
            (id) => document.querySelector(`#${id}`).innerText
        );
        if (a !== "" && a === b && a === c) {
            GameStatus = `${a} won`;
            for (let box of boxes) {
                box.style.pointerEvents = "none";
            }
            setTimeout(() => {
                winnerDisp.innerText = GameStatus;

                document.querySelector("#reset").innerText = "New game";
            }, 100);
            return true; // Indicate that a winner was found
        }
    }

    // Check for tie condition
    if (Array.from(boxes).every((box) => box.innerText !== "")) {
        setTimeout(() => {
            winnerDisp.innerText = "It's a tie!";
            document.querySelector("#reset").innerText = "New game";
        }, 100);
        return true; // Indicate a tie
    }

    return false; // No winner or tie
};
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
    });
    currPlayer = "X"; // Reset to player X
    document.querySelector("#player").innerText = `${currPlayer}'s`; // Update player display
    winnerDisp.innerText = "";
    document.querySelector("#reset").innerText = "Reset";
    for (let box of boxes) {
        box.style.pointerEvents = "auto";
    }
};

// Event listeners for boxes and reset button
boxes.forEach((box) => {
    box.addEventListener("click", selectBox);
});

const reset = document.querySelector("#reset");
reset.addEventListener("click", resetGame);
