const typingText = document.querySelector('.typing-text p');
const inputField = document.querySelector('.input-field');
const timeTag = document.querySelector('.time span b');
const mistakeTag = document.querySelector('.mistake span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const tryAgainBtn = document.querySelector('button');

let timer, maxTime = 60, timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

const paragraphs = [
    "The quick brown fox jumps over the lazy dog, showcasing its agility and speed as it leaps effortlessly across the grassy plains, leaving the drowsy dog behind in a tranquil slumber.",
    "Coding is both an art and a science, where creativity merges with logical thinking to solve problems and build digital solutions that can change the world.",
    "JavaScript is a versatile programming language used not only for web development but also in server-side applications, game development, and even mobile apps, making it a crucial tool for developers.",
    "Practice typing to improve your speed and accuracy, as these skills are essential in many professional fields, enabling faster communication and better productivity in a fast-paced work environment.",
    "The quick brown fox jumps over the lazy dog, illustrating the perfect example of a sentence that contains every letter of the alphabet, often used by typists to test their typing skills.",
    "JavaScript is a versatile programming language that plays a key role in web development, enhancing interactivity and user experience through dynamic content and responsive design.",
    "Practice typing to improve your speed and accuracy, as frequent practice helps you become more proficient, allowing you to type without looking at the keyboard and reducing errors.",
    "Typing fast requires focus and dedication, with a combination of mental clarity and muscle memory, making it one of the most valuable skills in the digital age where efficiency is key."
];

function loadParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
typingText.innerHTML = '';
paragraphs[randomIndex].split('').forEach(char => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
});
typingText.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown', () => inputField.focus());
typingText.addEventListener('click', () => inputField.focus());
}

function initTyping() {
const characters = typingText.querySelectorAll('span');
let typedChar = inputField.value.split('')[charIndex];

if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
    }

    if (typedChar == null) {
    charIndex--;
    if (characters[charIndex].classList.contains('incorrect')) mistakes--;
    characters[charIndex].classList.remove('correct', 'incorrect');
    } else {
    if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add('correct');
    } else {
        characters[charIndex].classList.add('incorrect');
        mistakes++;
    }
    charIndex++;
    }

    characters.forEach(span => span.classList.remove('active'));
    characters[charIndex].classList.add('active');

    mistakeTag.innerText = mistakes;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes;
} else {
    inputField.value = '';
    clearInterval(timer);
}
}

function initTimer() {
if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
} else {
    clearInterval(timer);
}
}

function resetGame() {
loadParagraph();
inputField.value = '';
clearInterval(timer);
timeLeft = maxTime;
charIndex = mistakes = isTyping = 0;
timeTag.innerText = timeLeft;
mistakeTag.innerText = mistakes;
wpmTag.innerText = 0;
cpmTag.innerText = 0;
}

loadParagraph();
inputField.addEventListener('input', initTyping);
tryAgainBtn.addEventListener('click', resetGame);
