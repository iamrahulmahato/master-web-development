// Expanded word to emoji mapping
const emojiDictionary = {
  happy: "😊",
  love: "❤️",
  sad: "😢",
  angry: "😡",
  excited: "🤩",
  cool: "😎",
  dog: "🐶",
  cat: "🐱",
  sun: "☀️",
  moon: "🌙",
  food: "🍔",
  pizza: "🍕",
  music: "🎵",
  dance: "💃",
  fire: "🔥",
  water: "💧",
  strong: "💪",
  coffee: "☕",
  heart: "💖",
  rocket: "🚀",
  car: "🚗",
  plane: "✈️",
  computer: "💻",
  phone: "📱",
  laugh: "😂",
  cry: "😭",
  party: "🎉",
  book: "📚",
  rain: "🌧️",
  star: "⭐",
  earth: "🌍",
  snow: "❄️",
  flower: "🌸",
  tree: "🌳",
  bike: "🚲",
  money: "💰",
  winner: "🏆",
  lightbulb: "💡",
  hourglass: "⏳",
  ghost: "👻",
  alien: "👽",
  robot: "🤖",
  monkey: "🐒",
  apple: "🍎",
  banana: "🍌",
  grapes: "🍇",
  bread: "🍞",
  chocolate: "🍫",
  cake: "🎂",
  cookie: "🍪",
  donut: "🍩",
  rainbow: "🌈",
  butterfly: "🦋",
  unicorn: "🦄",
  dragon: "🐉",
  tiger: "🐅",
  elephant: "🐘",
  crown: "👑",
  sword: "⚔️",
  shield: "🛡️",
  skull: "💀",
  smile: "😊",
  phone: "📞",
  eyes: "👀",
  mountain: "⛰️",
  guitar: "🎸",
  trumpet: "🎺",
  soccer: "⚽",
  basketball: "🏀",
  tennis: "🎾",
};

document
  .getElementById("translateButton")
  .addEventListener("click", function () {
    const inputText = document.getElementById("textInput").value;
    const words = inputText.split(" ");
    let emojiText = "";

    words.forEach((word) => {
      // Check if the word exists in the emoji dictionary
      if (emojiDictionary[word.toLowerCase()]) {
        emojiText += emojiDictionary[word.toLowerCase()] + " ";
      } else {
        emojiText += word + " "; // Leave word unchanged if no emoji match
      }
    });

    document.getElementById("emojiOutput").innerText = emojiText.trim();
  });
