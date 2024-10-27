const adventures = [
    {
        text: "You find yourself in a serene forest. What would you like to do?",
        choices: [
            { text: "Listen to the sounds of nature.", next: 1 },
            { text: "Meditate under a tree.", next: 2 }
        ]
    },
    {
        text: "You close your eyes and take a deep breath. You feel at peace.",
        choices: [
            { text: "Open your eyes and explore further.", next: 3 },
            { text: "Stay here and relax a bit longer.", next: null }
        ]
    },
    {
        text: "You sit under the tree, feeling the breeze on your skin. It’s calming.",
        choices: [
            { text: "Visualize a happy memory.", next: 3 },
            { text: "Focus on your breath.", next: null }
        ]
    },
    {
        text: "You've reached a beautiful lake. What would you like to do?",
        choices: [
            { text: "Watch the reflection of the clouds.", next: null },
            { text: "Throw a pebble into the water.", next: null }
        ]
    }
];

let currentAdventureIndex = 0;
let timer;
const timeLimit = 30; // seconds

const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices');
const nextButton = document.getElementById('next-button');
const timerDisplay = document.getElementById('time-left');
const timerElement = document.getElementById('timer');

function displayAdventure() {
    const adventure = adventures[currentAdventureIndex];
    storyText.textContent = adventure.text;
    choicesContainer.innerHTML = '';

    adventure.choices.forEach(choice => {
        const choiceButton = document.createElement('div');
        choiceButton.textContent = choice.text;
        choiceButton.className = 'choice';
        choiceButton.onclick = () => selectChoice(choice.next);
        choicesContainer.appendChild(choiceButton);
    });

    nextButton.style.display = 'none';
    timerElement.style.display = 'none';
    clearInterval(timer);
}

function selectChoice(nextIndex) {
    if (nextIndex === null) {
        timerElement.style.display = 'none';
        nextButton.style.display = 'block';
        return;
    }

    currentAdventureIndex = nextIndex;
    startTimer();
    displayAdventure();
}

function startTimer() {
    let timeLeft = timeLimit;
    timerElement.style.display = 'block';
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            storyText.textContent = "Time's up! Take a deep breath and reflect.";
            choicesContainer.innerHTML = '';
            nextButton.style.display = 'none';
            timerElement.style.display = 'none';
        }
    }, 1000);
}

// Start the adventure
displayAdventure();
