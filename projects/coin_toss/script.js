document.getElementById('flipButton').addEventListener('click', function() {
    const coin = document.getElementById('coin');
    const result = document.getElementById('result');
    const flipButton = this;
    let flipCount = parseInt(result.getAttribute("data-flip-count")) || 0;

    // Disable the button during the animation
    flipButton.disabled = true;

    // Set the coin to always show "Heads"
    coin.style.transform = 'rotateY(0deg)';

    // Display the "Heads" result after the animation
    setTimeout(() => {
        result.textContent = `Heads! Total Flips: ${++flipCount}`;
        result.setAttribute("data-flip-count", flipCount);
        result.style.opacity = 1;

        // Re-enable the button
        flipButton.disabled = false;
    }, 1000);

    // Reset the result display
    result.style.opacity = 0;
});
