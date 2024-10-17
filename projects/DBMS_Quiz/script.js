const questions = [
    {
        question: "What does DBMS stand for?",
        options: ["Database Management System", "Data Backup Management System", "Data Block Management System", "Database Manipulation Software"],
        answer: "Database Management System"
    },
    {
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
        answer: "MongoDB"
    },
    {
        question: "Which command is used to remove a table from a database?",
        options: ["DROP", "DELETE", "REMOVE", "ERASE"],
        answer: "DROP"
    },
    {
        question: "Which SQL clause is used to filter results?",
        options: ["SELECT", "WHERE", "ORDER BY", "GROUP BY"],
        answer: "WHERE"
    },
    {
        question: "Which key uniquely identifies a record in a table?",
        options: ["Foreign Key", "Primary Key", "Unique Key", "Composite Key"],
        answer: "Primary Key"
    },
    {
        question: "Which of the following is an aggregate function in SQL?",
        options: ["AVG", "COUNT", "SUM", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Which type of join returns all records when there is a match in either table?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        answer: "FULL OUTER JOIN"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

function startQuiz() {
    document.querySelector('.landing-page').classList.add('hidden'); // Hide landing page
    document.getElementById('quiz-container').classList.remove('hidden'); // Show quiz
    loadQuestion();
}

function startTimer() {
    timeLeft = 15; // Reset timer for each question
    document.getElementById('time-left').textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion(); // Automatically move to the next question when time runs out
        }
    }, 1000);
}

function loadQuestion() {
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const feedbackEl = document.getElementById('feedback');

    // Clear previous feedback
    feedbackEl.textContent = '';
    feedbackEl.classList.remove('correct', 'incorrect');
    feedbackEl.classList.add('hidden');

    // Display current question
    questionEl.textContent = questions[currentQuestion].question;
    
    // Clear previous options
    optionsEl.innerHTML = '';
    document.getElementById('next-btn').disabled = true; // Disable Next button until an option is selected

    // Create option buttons
    questions[currentQuestion].options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => {
            clearInterval(timerInterval); // Stop the timer when an option is selected
            checkAnswer(option);
        };
        optionsEl.appendChild(button);
    });

    startTimer(); // Start the timer for each question
}

function checkAnswer(selectedOption) {
    const optionsEl = document.getElementById('options');
    const feedbackEl = document.getElementById('feedback');

    // Disable all buttons after selecting
    optionsEl.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === questions[currentQuestion].answer) {
            btn.classList.add('correct'); // Highlight the correct answer in green
        } else if (btn.textContent === selectedOption) {
            btn.classList.add('incorrect'); // Highlight wrong selection in red
        }
    });

    // Provide feedback
    if (selectedOption === questions[currentQuestion].answer) {
        score++;
        feedbackEl.textContent = 'Correct!';
        feedbackEl.classList.add('correct');
    } else {
        feedbackEl.textContent = `Incorrect! The correct answer is: ${questions[currentQuestion].answer}`;
        feedbackEl.classList.add('incorrect');
    }
    feedbackEl.classList.remove('hidden'); // Show feedback message
    document.getElementById('next-btn').disabled = false; // Enable Next button
}

function nextQuestion() {
    clearInterval(timerInterval); // Stop timer if user manually clicks Next button
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById('quiz-box').classList.add('hidden');
    document.getElementById('score-box').classList.remove('hidden');
    document.getElementById('score').textContent = score + '/' + questions.length;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-box').classList.remove('hidden');
    document.getElementById('score-box').classList.add('hidden');
    loadQuestion();
}

// Load the first question when the page loads
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('next-btn').disabled = true; // Disable Next button initially
});
