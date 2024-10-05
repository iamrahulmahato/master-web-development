const apiUrl = 'http://localhost:5000/api/questions';

async function fetchQuestions() {
    const response = await fetch(apiUrl);
    const questions = await response.json();
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = '';
    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <h3>${question.title}</h3>
            <p>${question.content}</p>
            <button onclick="fetchAnswers('${question._id}')">View Answers</button>
            <div id="answers-${question._id}"></div>
            <textarea placeholder="Your answer here" id="answer-content-${question._id}"></textarea>
            <button onclick="submitAnswer('${question._id}')">Submit Answer</button>
        `;
        questionsList.appendChild(questionDiv);
    });
}

async function submitQuestion() {
    const title = document.getElementById('question-title').value;
    const content = document.getElementById('question-content').value;

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, user: 'Anonymous' }), // Replace 'Anonymous' with actual user data if available
    });

    document.getElementById('question-title').value = '';
    document.getElementById('question-content').value = '';
    fetchQuestions();
}

async function submitAnswer(questionId) {
    const content = document.getElementById(`answer-content-${questionId}`).value;

    await fetch('http://localhost:5000/api/answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId, content, user: 'Anonymous' }), // Replace 'Anonymous' with actual user data if available
    });

    document.getElementById(`answer-content-${questionId}`).value = '';
    fetchAnswers(questionId);
}

async function fetchAnswers(questionId) {
    const response = await fetch(`http://localhost:5000/api/answers/${questionId}`);
    const answers = await response.json();
    const answersDiv = document.getElementById(`answers-${questionId}`);
    answersDiv.innerHTML = '';
    answers.forEach(answer => {
        const answerDiv = document.createElement('div');
        answerDiv.innerHTML = `
            <p>${answer.content} - ${answer.user}</p>
        `;
        answersDiv.appendChild(answerDiv);
    });
}

// Event listener for submitting a question
document.getElementById('submit-question').addEventListener('click', submitQuestion);

// Initial fetch of questions
fetchQuestions();
