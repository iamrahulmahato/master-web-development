const puzzles = [
    { question: "What has keys but can't open locks?", answer: "piano" },
    { question: "I speak without a mouth and hear without ears. What am I?", answer: "echo" },
    { question: "I’m tall when I’m young, and I’m short when I’m old. What am I?", answer: "candle" }
];

let currentPuzzleIndex = 0;
let score = 0;
let timer;
const timeLimit = 30; // seconds

const puzzleText = document.getElementById('puzzle-text');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const feedback = document.getElementById('feedback');

function displayPuzzle() {
    if (currentPuzzleIndex < puzzles.length) {
        puzzleText.textContent = puzzles[currentPuzzleIndex].question;
        feedback.textContent = '';
        userInput.value = '';
        startTimer();
    } else {
        puzzleText.textContent = "You've escaped the room! Your score: " + score;
        userInput.style.display = 'none';
        submitButton.style.display = 'none';
    }
}

function startTimer() {
    clearInterval(timer);
    let timeLeft = timeLimit;
    feedback.textContent = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        feedback.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedback.textContent = "Time's up! Game over.";
            userInput.style.display = 'none';
            submitButton.style.display = 'none';
        }
    }, 1000);
}

submitButton.addEventListener('click', () => {
    const userAnswer = userInput.value.toLowerCase();
    if (userAnswer === puzzles[currentPuzzleIndex].answer) {
        feedback.textContent = "Correct! Score: " + (++score);
        currentPuzzleIndex++;
        displayPuzzle();
    } else {
        feedback.textContent = "Try again!";
        userInput.classList.add('incorrect');
        setTimeout(() => userInput.classList.remove('incorrect'), 500);
    }
});

// Initialize the first puzzle
displayPuzzle();
