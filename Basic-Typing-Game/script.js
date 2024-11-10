// all of our quotes
const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
typedValueElement.disabled = true;

// Load scores from local storage
let bestScore = localStorage.getItem("BestTime") || null;
let leastScore = localStorage.getItem("LeastTime") || null;

if (bestScore) {
  document.getElementById('best-score').innerText = `Best Score: ${bestScore} seconds`;
}
if (leastScore) {
  document.getElementById('least-score').innerText = `Least Time: ${leastScore} seconds`;
}

// at the end of script.js
document.getElementById('start').addEventListener('click', () => {
  // get a quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // Put the quote into an array of words
  words = quote.split(' ');
  // reset the word index for tracking
  wordIndex = 0;

  // UI updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map(word => `<span>${word} </span>`);
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join('');
  // Highlight the first word
  quoteElement.childNodes[0].className = 'highlight';
  // Clear any prior messages
  messageElement.innerText = '';

  // Setup the textbox
  typedValueElement.value = '';
  typedValueElement.disabled = false; // Activate input
  typedValueElement.focus();

  // Start the timer
  startTime = new Date().getTime();
});

// at the end of script.js
typedValueElement.addEventListener('input', () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
      // end of sentence
      const elapsedTime = (new Date().getTime() - startTime) / 1000;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime} seconds.`;
      messageElement.innerText = message;
      typedValueElement.disabled = true;

      // Check and update least and best scores
      if (!bestScore || elapsedTime < parseFloat(bestScore)) {
          bestScore = elapsedTime;
          localStorage.setItem("BestTime", bestScore);
          document.getElementById('best-score').innerText = `Best Score: ${bestScore} seconds`;
      }

      if (!leastScore || elapsedTime > parseFloat(leastScore)) {
          leastScore = elapsedTime;
          localStorage.setItem("LeastTime", leastScore);
          document.getElementById('least-score').innerText = `Least Time: ${leastScore} seconds`;
      }

  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // end of word
      typedValueElement.value = '';
      wordIndex++;
      // reset the class name for all elements in quote
      for (const wordElement of quoteElement.childNodes) {
          wordElement.className = '';
      }
      // highlight the new word
      quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = ''; // Correct typing
  } else {
      typedValueElement.className = 'error'; // Error state
  }
});
