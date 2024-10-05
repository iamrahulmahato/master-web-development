const answers = [
    "Yes",
    "No",
    "Ask Again",
    "Definitely",
    "Very Doubtful",
    "It is certain",
    "Cannot predict now",
    "Outlook not so good",
    "Signs point to yes"
  ];
  
  const answerElement = document.getElementById("answer");
  const shakeButton = document.getElementById("shakeButton");
  
  shakeButton.addEventListener("click", () => {
    // Disable button temporarily to simulate shaking
    shakeButton.disabled = true;
    answerElement.textContent = "Shaking...";
    
    // Simulate the shaking effect for 2 seconds
    setTimeout(() => {
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      answerElement.textContent = randomAnswer;
      
      // Re-enable button after answer is displayed
      shakeButton.disabled = false;
    }, 2000);
  });
  