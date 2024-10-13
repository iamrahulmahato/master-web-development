document.getElementById('flipButton').addEventListener('click', function() {
    const coin = document.getElementById('coin');
    const result = document.getElementById('result');
    const flipButton = this;

    // Disable the button during the animation
    flipButton.disabled = true;

    // Determine the result and set the coin's rotation
    const isHeads = Math.random() < 0.5;
    coin.style.transform = `rotateY(${isHeads ? 0 : 180}deg)`;

    // Display the result after the animation
    setTimeout(() => {
        result.textContent = isHeads ? 'Heads' : 'Tails';
        result.style.opacity = 1;

        // Re-enable the button
        flipButton.disabled = false;
    }, 1000);

    // Reset the result display
    result.style.opacity = 0;
});