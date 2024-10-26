import { textNodes } from "./textNodes.js";

const titleElement = document.getElementById("title");
const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");

function toggleButtonState(disable) {
  const buttons = document.querySelectorAll(".choice");
  for (let button of buttons) {
    button.disabled = disable;
  }
}

function showTextNode(textNodeIndex) {
  if (window.animationInterval) {
    clearInterval(window.animationInterval);
  }

  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  titleElement.innerText = textNode.title;
  storyElement.textContent = "";

  const backgroundElement = document.getElementById("background");
  backgroundElement.style.backgroundImage = 'url("' + textNode.img + '")';
  backgroundElement.style.backgroundSize = "cover";
  backgroundElement.style.backgroundPosition = "center";

  while (choicesElement.firstChild) {
    choicesElement.removeChild(choicesElement.firstChild);
  }

  textNode.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option.text;
    button.classList.add("choice");
    button.addEventListener("click", () => selectOption(option));
    choicesElement.appendChild(button);
  });

  const words = textNode.text.split("");
  let index = 0;

  toggleButtonState(true);

  window.animationInterval = setInterval(() => {
    if (index < words.length) {
      storyElement.textContent += words[index++];
    } else {
      clearInterval(window.animationInterval);
      toggleButtonState(false);
    }
  }, 20);
}

function selectOption(option) {
  if (option.action === "link") {
    window.open(option.linkUrl, "_blank");
    return;
  }

  const nextTextNodeId = option.nextText;
  showTextNode(nextTextNodeId);
}

window.onload = () => showTextNode(1);

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

bgMusic.loop = true;

let musiPlaying = false;
musicToggle.innerText = "Play Music";

musicToggle.addEventListener("click", () => {
  if (musiPlaying) {
    bgMusic.pause();
    musicToggle.innerText = "Play Music";
  } else {
    bgMusic.play();
    musicToggle.innerText = "Pause Music";
  }
  musiPlaying = !musiPlaying;
});
