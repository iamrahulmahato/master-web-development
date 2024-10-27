let ecosystem = [];
let water = 100;
let food = 100;
let turns = 0;
const maxTurns = 20;

const ecosystemDiv = document.getElementById('ecosystem');
const statsDiv = document.getElementById('stats');

document.getElementById('addPlant').addEventListener('click', () => {
    if (water >= 10) {
        const plant = { type: 'plant', growth: Math.random() * 10 };
        ecosystem.push(plant);
        water -= 10;
        updateEcosystem();
    } else {
        alert("Not enough water!");
    }
});

document.getElementById('addAnimal').addEventListener('click', () => {
    if (food >= 10) {
        const animal = { type: 'animal', hunger: Math.random() * 10 };
        ecosystem.push(animal);
        food -= 10;
        updateEcosystem();
    } else {
        alert("Not enough food!");
    }
});

function updateEcosystem() {
    ecosystemDiv.innerHTML = '';
    ecosystem.forEach(species => {
        const div = document.createElement('div');
        div.className = 'species ' + species.type;
        div.innerText = species.type === 'plant' ? '🌱' : '🐾';
        ecosystemDiv.appendChild(div);
    });
    updateStats();
}

function updateStats() {
    statsDiv.innerHTML = `Water: ${water} | Food: ${food} | Species Count: ${ecosystem.length} | Turns: ${turns}`;
    checkWinLose();
}

function checkWinLose() {
    if (water <= 0 || food <= 0) {
        alert("You have lost! The ecosystem has collapsed.");
        resetGame();
    } else if (turns >= maxTurns) {
        alert("Congratulations! You have maintained the ecosystem successfully.");
        resetGame();
    }
}

function resetGame() {
    ecosystem = [];
    water = 100;
    food = 100;
    turns = 0;
    updateEcosystem();
}

function randomEvent() {
    const event = Math.random();
    if (event < 0.3) {
        water -= 20; // Drought
        alert("A drought has occurred! Water reduced by 20.");
    } else if (event < 0.6) {
        water += 20; // Abundant rain
        alert("Abundant rain! Water increased by 20.");
    } else if (event < 0.9) {
        food += 10; // Food bounty
        alert("A food bounty has occurred! Food increased by 10.");
    } else {
        // No event
        alert("No significant events this turn.");
    }
}

// Simulate resource consumption and turns
setInterval(() => {
    if (turns < maxTurns) {
        if (water > 0) water -= 1;
        if (food > 0) food -= 1;
        turns += 1;
        randomEvent(); // Trigger a random event every turn
        updateStats();
    }
}, 5000);
