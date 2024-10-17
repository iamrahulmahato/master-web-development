const textInput = document.getElementById("text-input");
const speakBtn = document.getElementById("speak-btn");
const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");
const rateValue = document.getElementById("rate-value");
const pitchValue = document.getElementById("pitch-value");
const status = document.getElementById("status");

rateInput.addEventListener("input", () => {
  rateValue.textContent = rateInput.value;
});

pitchInput.addEventListener("input", () => {
  pitchValue.textContent = pitchInput.value;
});

speakBtn.addEventListener("click", function() {
  const text = textInput.value;
  if (!text) {
    status.textContent = "Please enter some text!";
    return;
  }
  
  const speech = new SpeechSynthesisUtterance(text);
  speech.pitch = pitchInput.value;
  speech.rate = rateInput.value;
  
  // Update status during speech
  status.textContent = "Speaking...";
  
  speech.onend = () => {
    status.textContent = "Speech finished.";
  };
  
  speech.onerror = () => {
    status.textContent = "Error occurred while speaking.";
  };
  
  window.speechSynthesis.speak(speech);
});
