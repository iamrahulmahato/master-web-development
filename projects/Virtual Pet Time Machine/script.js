const petName = "Fluffy";
let petAge = 0;
let petHappiness = 100;
let currentEra = "Present";
let petSkills = [];
const eras = [
    { name: "Prehistoric", description: "You've traveled back to the time of dinosaurs!" },
    { name: "Ancient Egypt", description: "Welcome to the land of Pharaohs and Pyramids!" },
    { name: "Medieval", description: "You're in the age of knights and castles!" },
    { name: "Future", description: "You've jumped ahead to a world of advanced technology!" }
];

const choices = {
    "Prehistoric": ["Hunt for food", "Make tools"],
    "Ancient Egypt": ["Learn hieroglyphics", "Build a pyramid"],
    "Medieval": ["Become a knight", "Train a dragon"],
    "Future": ["Learn coding", "Explore space"]
};

document.getElementById('petName').innerText = petName;
document.getElementById('petAge').innerText = petAge;
document.getElementById('petHappiness').innerText = petHappiness;
document.getElementById('currentEra').innerText = currentEra;
document.getElementById('petSkills').innerText = petSkills.join(', ') || 'None';

document.getElementById('timeTravelButton').addEventListener('click', () => {
    timeTravel();
});

document.getElementById('feedButton').addEventListener('click', () => {
    feedPet();
});

document.getElementById('playButton').addEventListener('click', () => {
    playWithPet();
});

// Time travel functionality
function timeTravel() {
    const randomEraIndex = Math.floor(Math.random() * eras.length);
    currentEra = eras[randomEraIndex].name;
    document.getElementById('currentEra').innerText = currentEra;
    document.getElementById('eraDescription').innerText = eras[randomEraIndex].description;

    // Age up the pet
    petAge++;
    document.getElementById('petAge').innerText = petAge;

    // Reduce happiness slightly for time travel
    petHappiness = Math.max(0, petHappiness - 10);
    document.getElementById('petHappiness').innerText = petHappiness;

    // Show choices for the current era
    showChoices(currentEra);
}

// Show choices based on the current era
function showChoices(era) {
    const choicesContainer = document.getElementById('choiceButtons');
    choicesContainer.innerHTML = ''; // Clear previous choices
    choicesContainer.style.display = 'block';

    choices[era].forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.addEventListener('click', () => unlockSkill(choice));
        choicesContainer.appendChild(button);
    });
}

// Unlock skill functionality
function unlockSkill(choice) {
    if (!petSkills.includes(choice)) {
        petSkills.push(choice);
        document.getElementById('petSkills').innerText = petSkills.join(', ');
        alert(`Your pet has learned a new skill: ${choice}!`);
    } else {
        alert(`Your pet already knows this skill: ${choice}.`);
    }
}

// Feed pet functionality
function feedPet() {
    petHappiness = Math.min(100, petHappiness + 20);
    document.getElementById('petHappiness').innerText = petHappiness;
}

// Play with pet functionality
function playWithPet() {
    petHappiness = Math.min(100, petHappiness + 10);
    document.getElementById('petHappiness').innerText = petHappiness;
}
