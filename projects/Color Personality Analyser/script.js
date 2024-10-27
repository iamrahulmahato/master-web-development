// script.js

function analyzeColor() {
    // Get the values from the form
    const timeOfDay = document.querySelector('input[name="timeOfDay"]:checked');
    const activity = document.querySelector('input[name="activity"]:checked');
    const resultDiv = document.getElementById("result");

    // Ensure both questions are answered
    if (!timeOfDay || !activity) {
        resultDiv.innerHTML = "Please answer all questions!";
        resultDiv.style.color = "red";
        resultDiv.style.display = "block";
        return;
    }

    // Basic logic to determine color personality
    let color, emoji;
    if (timeOfDay.value === "morning" && activity.value === "reading") {
        color = "Yellow";
        emoji = "🌞";
        resultText = "You are optimistic and cheerful!";
    } else if (timeOfDay.value === "afternoon" && activity.value === "traveling") {
        color = "Blue";
        emoji = "🌊";
        resultText = "You are calm and seek adventure!";
    } else if (timeOfDay.value === "evening" && activity.value === "sports") {
        color = "Red";
        emoji = "🔥";
        resultText = "You are passionate and energetic!";
    } else if (timeOfDay.value === "night" && activity.value === "art") {
        color = "Purple";
        emoji = "🌌";
        resultText = "You are creative and introspective!";
    } else {
        color = "Green";
        emoji = "🌿";
        resultText = "You are balanced and down-to-earth!";
    }

    // Display result with color and emoji
    resultDiv.innerHTML = `${emoji} Your color is <strong>${color}</strong>! ${resultText}`;
    resultDiv.style.color = color.toLowerCase();
    resultDiv.style.display = "block";
}
