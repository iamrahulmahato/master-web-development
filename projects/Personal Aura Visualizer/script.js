const generateButton = document.getElementById('generate-button');
const auraElement = document.getElementById('aura');

generateButton.addEventListener('click', generateAura);

function generateAura() {
    const colors = [
        'rgba(255, 0, 0, 0.5)',  // Red
        'rgba(0, 255, 0, 0.5)',  // Green
        'rgba(0, 0, 255, 0.5)',  // Blue
        'rgba(255, 255, 0, 0.5)', // Yellow
        'rgba(255, 0, 255, 0.5)', // Magenta
        'rgba(0, 255, 255, 0.5)', // Cyan
        'rgba(255, 165, 0, 0.5)', // Orange
        'rgba(128, 0, 128, 0.5)', // Purple
    ];

    // Randomly select a color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Apply the aura color
    auraElement.style.backgroundColor = randomColor;
    auraElement.style.opacity = '1';
    auraElement.style.transform = 'scale(1.2)'; // Slightly scale up the aura

    // Fade out the aura after a short duration
    setTimeout(() => {
        auraElement.style.transform = 'scale(1)'; // Reset scale
        auraElement.style.opacity = '0';
    }, 1500);
}
