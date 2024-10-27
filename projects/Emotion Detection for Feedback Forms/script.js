const form = document.getElementById('feedback-form');
const emotionResult = document.getElementById('emotion-result');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const feedbackText = document.getElementById('feedback').value;
    const emotion = detectEmotion(feedbackText);

    // Clear previous emotion result class
    emotionResult.classList.remove('emotion-positive', 'emotion-negative', 'emotion-neutral');

    // Set emotion result class based on detected emotion
    emotionResult.classList.add(`emotion-${emotion.toLowerCase()}`);
    
    emotionResult.textContent = `Detected Emotion: ${emotion}`;
    form.reset(); // Clear the form after submission
});

// Simulated emotion detection function
function detectEmotion(text) {
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'love', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'hate', 'sad', 'awful', 'poor'];

    let score = 0;

    const words = text.toLowerCase().split(/\s+/);
    for (const word of words) {
        if (positiveWords.includes(word)) {
            score++;
        } else if (negativeWords.includes(word)) {
            score--;
        }
    }

    if (score > 0) {
        return 'Positive';
    } else if (score < 0) {
        return 'Negative';
    } else {
        return 'Neutral';
    }
}
