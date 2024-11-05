const apiUrl = "https://opentdb.com/api.php?amount=1&type=multiple";
let correctAnswer;
let difficulty = "easy";
let correctAnswersCount = 0;
const maxQuestions = 5;

function setDifficulty(selectedDifficulty) {
  difficulty = selectedDifficulty;
  document.getElementById("difficulty-selection").style.display = "none";
  document.getElementById("puzzle-section").style.display = "block";
  correctAnswersCount = 0;
  fetchRandomQuestion();
}

async function fetchRandomQuestion() {
  try {
    const response = await fetch(`${apiUrl}&difficulty=${difficulty}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      displayQuestion(data.results[0]);
    } else {
      document.getElementById("result-section").innerHTML =
        "<p>No questions available for this difficulty level. Please choose another difficulty.</p>";
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    document.getElementById("result-section").innerHTML =
      "<p>There was an error fetching the question. Please try again later.</p>";
  }
}

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function displayQuestion(questionData) {
  const questionElement = document.getElementById("puzzle");
  const resultSection = document.getElementById("result-section");
  resultSection.innerHTML = "";
  questionElement.textContent = decodeHtml(questionData.question);

  correctAnswer = questionData.correct_answer;
  const answers = [...questionData.incorrect_answers, correctAnswer].sort(
    () => Math.random() - 0.5
  );
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = decodeHtml(answer);
    button.onclick = () => checkAnswer(answer);
    optionsContainer.appendChild(button);
  });
}

function showConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function checkAnswer(selectedAnswer) {
  const resultSection = document.getElementById("result-section");

  if (selectedAnswer === correctAnswer) {
    correctAnswersCount++;
    resultSection.innerHTML = "<p>Correct! Here’s a new puzzle...</p>";
    showConfetti();

    if (correctAnswersCount === maxQuestions) {
      resultSection.innerHTML =
        "<p>Congratulations! You've escaped the room!</p>";
      document.getElementById("options").innerHTML = "";
    } else {
      setTimeout(fetchRandomQuestion, 1500);
    }
  } else {
    resultSection.innerHTML = "<p>Incorrect. Try again!</p>";
  }
}
