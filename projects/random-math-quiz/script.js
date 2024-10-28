let questionContainer = document.getElementById('question');
let optionsContainer = document.getElementById('options');
let nextButton = document.getElementById('next-btn');
let restartButton = document.getElementById('restart-btn');
let scoreBox = document.getElementById('score-box');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionIndex = 0;
let questions = [];

// Fetching the Math Questions from the API
const fetchQuestions = async () => {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=19&type=multiple');
    const data = await res.json();
    questions = data.results.map((loadedQuestion) => {
        const formattedQuestion = {
            question: loadedQuestion.question,
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

        formattedQuestion.choices = answerChoices;

        return formattedQuestion;
    });

    startQuiz();
};

// Start the Quiz
const startQuiz = () => {
    questionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    loadNextQuestion();
};

// Load Next Question
const loadNextQuestion = () => {
    if (questionIndex >= questions.length) {
        showScore();
        return;
    }

    currentQuestion = questions[questionIndex];
    questionContainer.innerHTML = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.innerText = choice;
        button.dataset.number = index + 1;
        button.addEventListener('click', handleAnswerClick);
        optionsContainer.appendChild(button);
    });

    acceptingAnswers = true;
};

// Handle Answer Click
const handleAnswerClick = (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedButton = e.target;
    const selectedAnswer = selectedButton.dataset.number;

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
        score++;
    }

    selectedButton.classList.add(classToApply);

    setTimeout(() => {
        questionIndex++;
        loadNextQuestion();
    }, 1000);
};

// Show Score
const showScore = () => {
    questionContainer.innerHTML = 'Quiz Complete!';
    scoreBox.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.classList.add('hidden');
    optionsContainer.style.display = 'none';
};

nextButton.addEventListener('click', loadNextQuestion);
restartButton.addEventListener('click', () => {
    window.location.reload();
})

// Start fetching questions
fetchQuestions();