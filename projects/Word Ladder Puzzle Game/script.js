// A simple word list (you should replace this with a more comprehensive dictionary)
const wordList = new Set(['cat', 'cot', 'dot', 'dog', 'log', 'lag', 'bag', 'big', 'pig', 'pin', 'pan', 'man', 'mat', 'hat']);

let startWord, endWord, currentWord;
let wordChain = [];

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('submit-word').addEventListener('click', submitWord);

function startGame() {
    startWord = document.getElementById('start-word').value.toLowerCase();
    endWord = document.getElementById('end-word').value.toLowerCase();
    
    if (startWord.length !== endWord.length || !wordList.has(startWord) || !wordList.has(endWord)) {
        showMessage('Invalid words. Please try again.');
        return;
    }
    
    currentWord = startWord;
    wordChain = [startWord];
    updateWordChain();
    showMessage('Game started! Change one letter at a time to reach the end word.');
}

function submitWord() {
    const userWord = document.getElementById('user-word').value.toLowerCase();
    
    if (!isValidWord(userWord)) {
        showMessage('Invalid word. Try again.');
        return;
    }
    
    if (!isOneLetterDifference(currentWord, userWord)) {
        showMessage('You can only change one letter at a time.');
        return;
    }
    
    currentWord = userWord;
    wordChain.push(currentWord);
    updateWordChain();
    
    if (currentWord === endWord) {
        showMessage('Congratulations! You\'ve completed the word ladder!');
    }
}

function isValidWord(word) {
    return wordList.has(word);
}

function isOneLetterDifference(word1, word2) {
    if (word1.length !== word2.length) return false;
    let differences = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) differences++;
    }
    return differences === 1;
}

function updateWordChain() {
    document.getElementById('word-chain').textContent = wordChain.join(' → ');
    document.getElementById('user-word').value = '';
}

function showMessage(message) {
    document.getElementById('message').textContent = message;
}