// Get DOM elements
const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

// Sample data for images and text
const data = [
    { image: './img/drink.jpg', text: "Get me some water please. I'm thirsty." },
    { image: './img/food.jpg', text: "I am hungry. Get me some food." },
    { image: './img/tired.jpg', text: "I am tired. I need to sleep." },
    { image: './img/hurt.jpg', text: "I am hurt. I need a doctor." },
    { image: './img/happy.jpg', text: "I am happy. I am feeling good." },
    { image: './img/angry.jpg', text: "I am angry. I am feeling bad." },
    { image: './img/sad.jpg', text: "I am sad. I am feeling down." },
    { image: './img/scared.jpg', text: "I am scared. I am feeling uneasy." },
    { image: './img/outside.jpg', text: "I want to go outside. I want to play." },
    { image: './img/home.jpg', text: "I want to go home. I want to rest." },
    { image: './img/school.jpg', text: "I want to go to school. I want to study." },
    { image: './img/grandma.jpg', text: "I want to go to grandma's house. I want to visit." }
];

// Create boxes for each image-text pair
data.forEach(createBox);

// Create a speech synthesis instance
const message = new SpeechSynthesisUtterance();
let voices = [];

// Get and populate available voices
function getVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');
}

// Set the text for speech synthesis
function setTextMessage(text) {
    message.text = text;
}

// Speak the text using the selected voice
function speakText() {
    speechSynthesis.speak(message);
}

// Set the selected voice for speech synthesis
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// Create a speech box for each item in the data
function createBox(item) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `
        <img src="${item.image}" alt="${item.text}" />
        <p class="info">${item.text}</p>
    `;
    box.addEventListener('click', () => {
        setTextMessage(item.text);
        speakText();
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });
    main.appendChild(box);
}


// Event listeners
speechSynthesis.addEventListener('voiceschanged', getVoices);
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));
voiceSelect.addEventListener('change', setVoice);
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

// Initialize voices
getVoices();