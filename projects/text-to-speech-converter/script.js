// Select the DOM elements
const convertBtn = document.getElementById('convert-btn');
const clearBtn = document.getElementById('clear-btn');
const textInput = document.getElementById('text-input');
const statusMessage = document.getElementById('status');
const pitchControl = document.getElementById('pitch');
const pitchValue = document.getElementById('pitch-value');
const rateControl = document.getElementById('rate');
const rateValue = document.getElementById('rate-value');
const languageSelect = document.getElementById('language');

// Update the displayed pitch and rate values dynamically
pitchControl.addEventListener('input', () => {
  pitchValue.textContent = pitchControl.value;
});

rateControl.addEventListener('input', () => {
  rateValue.textContent = rateControl.value;
});

// Function to convert text to speech
function textToSpeech(text, pitch, rate, language) {
  if (!text) {
    statusMessage.textContent = "Please enter some text!";
    statusMessage.style.opacity = "1";
    statusMessage.style.color = "#ff5757";
    return;
  }

  let speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.pitch = pitch;
  speech.rate = rate;
  speech.lang = language;

  // Set message when speaking starts
  speech.onstart = () => {
    statusMessage.textContent = "Speaking...";
    statusMessage.style.opacity = "1";
    statusMessage.style.color = "#0b0b0b";
    statusMessage.style.textDecoration = "underline"
  };

  // Reset message after speaking ends
  speech.onend = () => {
    statusMessage.textContent = "Finished!";
    setTimeout(() => {
      statusMessage.style.opacity = "0";
    }, 2000);
  };

  window.speechSynthesis.speak(speech);
}

// Add event listeners to buttons
convertBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  const pitch = pitchControl.value;
  const rate = rateControl.value;
  const language = languageSelect.value;

  textToSpeech(text, pitch, rate, language);
});

clearBtn.addEventListener('click', () => {
  textInput.value = "";
  statusMessage.textContent = "";
});
