// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");
const robot = document.getElementById("robot");

const button = document.getElementById("button");
const programmingButton = document.getElementById("programming");
const darkButton = document.getElementById("dark");
const nsfwButton = document.getElementById("nsfw");

let currentAPIUrl =
  "https://sv443.net/jokeapi/v2/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist,sexist";

let joke;

//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== "undefined";

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

let voices = [];

const getVoices = () => {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
  console.log(voices);
};

//Fix for duplication, run code depending on the browser
if (isFirefox) {
  getVoices();
}

if (!isChrome) {
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = getVoices;
  }
}

const speakingFunction = (data) => {
  robot.src = "img/robot2.gif";
  // Add background animation

  body.style.background = "#141414 url(img/wave.gif)";
  body.style.backgroundRepeat = "repeat-x";
  body.style.backgroundSize = "100% 100%";

  // Get speak text
  const speakText = new SpeechSynthesisUtterance(data);

  // Speak end
  speakText.onend = (e) => {
    robot.src = "img/robot.gif";
    console.log("Done speaking...");
    body.style.background = "#141414";
  };

  // Speak error
  speakText.onerror = (e) => {
    console.error("Something went wrong");
  };

  // Selected voice
  const selectedVoice =
    voiceSelect.selectedOptions[0].getAttribute("data-name");

  // Loop through voices
  voices.forEach((voice) => {
    if (voice.name === selectedVoice) {
      speakText.voice = voice;
    }
  });

  // Set pitch and rate
  speakText.rate = rate.value;
  speakText.pitch = pitch.value;
  // Speak
  speechSynthesis.speak(speakText);
};

const speak = () => {
  if (speechSynthesis.speaking) {
    console.log("Already speaking...");
    return;
  }
  if (textInput.value !== "") {
    speakingFunction(textInput.value);
  }
};

// Text form submit
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.value = "";
  textInput.blur();
});

// Rate value change
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener("change", (e) => {
  speak();
  textInput.value = "";
});

// Get jokes from Joke API

async function getJokes() {
  joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Passing Joke to VoiceRSS API
    speakingFunction(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Error Here
  }
}

// Disable / Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

button.addEventListener("click", () => {
  getJokes();
  toggleButton();
});

// These are to let the user switch between different joke types.
programmingButton.addEventListener("click", () => {
  darkButton.disabled = false;
  nsfwButton.disabled = false;
  programmingButton.disabled = true;
  currentAPIUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist,sexist";
});

darkButton.addEventListener("click", () => {
  darkButton.disabled = true;
  nsfwButton.disabled = false;
  programmingButton.disabled = false;
  currentAPIUrl =
    "https://sv443.net/jokeapi/v2/joke/Dark?blacklistFlags=nsfw,religious,political,racist,sexist";
});
nsfwButton.addEventListener("click", () => {
  darkButton.disabled = false;
  nsfwButton.disabled = true;
  programmingButton.disabled = false;
  currentAPIUrl =
    "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political,racist,sexist";
});
