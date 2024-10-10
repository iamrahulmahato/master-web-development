const flags = [
    { country: "India", flagUrl: "https://flagcdn.com/w320/in.png" },
    { country: "Canada", flagUrl: "https://flagcdn.com/w320/ca.png" },
    { country: "Germany", flagUrl: "https://flagcdn.com/w320/de.png" },
    { country: "Brazil", flagUrl: "https://flagcdn.com/w320/br.png" },
    { country: "Japan", flagUrl: "https://flagcdn.com/w320/jp.png" },
    { country: "Australia", flagUrl: "https://flagcdn.com/w320/au.png" },
    { country: "United States", flagUrl: "https://flagcdn.com/w320/us.png" },
    { country: "France", flagUrl: "https://flagcdn.com/w320/fr.png" },
    { country: "United Kingdom", flagUrl: "https://flagcdn.com/w320/gb.png" },
    { country: "Italy", flagUrl: "https://flagcdn.com/w320/it.png" },
    { country: "Russia", flagUrl: "https://flagcdn.com/w320/ru.png" },
    { country: "South Korea", flagUrl: "https://flagcdn.com/w320/kr.png" },
    { country: "China", flagUrl: "https://flagcdn.com/w320/cn.png" },
    { country: "Spain", flagUrl: "https://flagcdn.com/w320/es.png" },
    { country: "Mexico", flagUrl: "https://flagcdn.com/w320/mx.png" },
    { country: "Argentina", flagUrl: "https://flagcdn.com/w320/ar.png" },
    { country: "Egypt", flagUrl: "https://flagcdn.com/w320/eg.png" },
    { country: "Nigeria", flagUrl: "https://flagcdn.com/w320/ng.png" },
    { country: "Kenya", flagUrl: "https://flagcdn.com/w320/ke.png" },
    { country: "Turkey", flagUrl: "https://flagcdn.com/w320/tr.png" },
    { country: "Saudi Arabia", flagUrl: "https://flagcdn.com/w320/sa.png" },
    { country: "Indonesia", flagUrl: "https://flagcdn.com/w320/id.png" },
    { country: "South Africa", flagUrl: "https://flagcdn.com/w320/za.png" },
    { country: "New Zealand", flagUrl: "https://flagcdn.com/w320/nz.png" },
    { country: "Sweden", flagUrl: "https://flagcdn.com/w320/se.png" }
];

let currentFlagIndex = 0;
let correctCountry = '';
const flagImg = document.getElementById('flag');
const optionButtons = Array.from(document.getElementsByClassName('option-button'));
const resultDiv = document.getElementById('result');
const nextButton = document.getElementById('nextButton');

// Load and display the flag and options
function loadFlag() {
    const currentFlag = flags[currentFlagIndex];
    flagImg.src = currentFlag.flagUrl;
    correctCountry = currentFlag.country;

    // Create options array including the correct answer
    let options = [correctCountry];
    
    // Add 3 more random countries that are not the correct answer
    while (options.length < 4) {
        let randomCountry = flags[Math.floor(Math.random() * flags.length)].country;
        if (!options.includes(randomCountry)) {
            options.push(randomCountry);
        }
    }

    // Shuffle the options so the correct answer isn't always first
    shuffleArray(options);

    // Assign options to buttons
    optionButtons.forEach((button, index) => {
        button.textContent = options[index];
        button.disabled = false;
        button.style.backgroundColor = "#007bff"; // Reset button color 
        button.onclick = () => checkAnswer(button);
    });

    // Hide result and next button
    resultDiv.textContent = '';
    nextButton.style.display = 'none';
}

// Check the answer and trigger confetti if correct
function checkAnswer(button) {
    const selectedCountry = button.textContent;
    if (selectedCountry === correctCountry) {
        button.style.backgroundColor = '#28a745'; // Green for correct answer
        resultDiv.textContent = 'Correct!';
        triggerConfetti(); // Call confetti effect
    } else {
        button.style.backgroundColor = '#dc3545'; // Red for wrong answer
        resultDiv.textContent = `Oops! Better luck next time. The correct answer is ${correctCountry}.`;

        // Add shake effect to the flag image
        flagImg.classList.add('shake');

        // Remove the shake effect after animation ends
        setTimeout(() => {
            flagImg.classList.remove('shake');
        }, 500);
    }

    // Disable buttons after selecting an answer
    optionButtons.forEach(btn => btn.disabled = true);
    nextButton.style.display = 'inline-block'; // Show next button
}

// Trigger confetti effect
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Load the next flag
function nextFlag() {
    currentFlagIndex = (currentFlagIndex + 1) % flags.length;
    loadFlag();
}

// Shuffle the options array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

nextButton.addEventListener('click', nextFlag);

// Load the first flag on page load
loadFlag();
