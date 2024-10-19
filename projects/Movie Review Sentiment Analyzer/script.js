// script.js
function analyzeSentiment() {
    const positiveWords = ["great", "amazing", "awesome", "exciting", "good"];
    const negativeWords = ["awful", "boring", "bad", "terrible", "waste"];
    
    const review = document.getElementById("review").value.toLowerCase();
    let score = 0;
  
    positiveWords.forEach(word => {
      if (review.includes(word)) score++;
    });
  
    negativeWords.forEach(word => {
      if (review.includes(word)) score--;
    });
  
    const result = document.getElementById("result");
    if (score > 0) {
      result.textContent = "Sentiment: Positive 😊";
      result.style.color = "green";
    } else if (score < 0) {
      result.textContent = "Sentiment: Negative 😞";
      result.style.color = "red";
    } else {
      result.textContent = "Sentiment: Neutral 😐";
      result.style.color = "gray";
    }
  }
  