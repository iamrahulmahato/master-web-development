// Initialize pet status
let hunger = 50;
let boredom = 50;
let health = 50;
let tiredness = 50;

// Update pet status display
function updatePetStatus() {
    document.getElementById('hunger').innerText = hunger;
    document.getElementById('boredom').innerText = boredom;
    document.getElementById('health').innerText = health;
    document.getElementById('tiredness').innerText = tiredness;

    // Add animations based on pet status
    const petImage = document.getElementById('pet');
    if (hunger > 80) {
        petImage.classList.add('hungry');
    } else {
        petImage.classList.remove('hungry');
    }

    if (boredom > 80) {
        petImage.classList.add('bored');
    } else {
        petImage.classList.remove('bored');
    }

    if (health < 20) {
        petImage.classList.add('sick');
    } else {
        petImage.classList.remove('sick');
    }

    if (tiredness > 80) {
        petImage.classList.add('tired');
    } else {
        petImage.classList.remove('tired');
    }
}

// Feed pet
document.getElementById('feed-pet').addEventListener('click', () => {
    hunger -= 10;
    if (hunger < 0) hunger = 0;
    updatePetStatus();
});

// Play with pet
document.getElementById('play-with-pet').addEventListener('click', () => {
    boredom -= 10;
    if (boredom < 0) boredom = 0;
    updatePetStatus();
});

// Give medicine
document.getElementById('give-medicine').addEventListener('click', () => {
    health += 10;
    if (health > 100) health = 100;
    updatePetStatus();
});

// Put pet to bed
document.getElementById('put-to-bed').addEventListener('click', () => {
    tiredness -= 10;
    if (tiredness < 0) tiredness = 0;
    updatePetStatus();
});

// Update pet status every second
setInterval(() => {
    hunger += 1;
    boredom += 1;
    health -= 1;
    tiredness += 1;
    if (hunger > 100) hunger = 100;
    if (boredom > 100) boredom = 100;
    if (health < 0) health = 0;
    if (tiredness > 100) tiredness = 100;
    updatePetStatus();
}, 1000);