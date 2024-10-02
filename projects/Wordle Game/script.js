const words = [ 'blind', 'space', 'belly', 'motor', 'peace', 'sweet', 'thief', 'young',
    'apple', 'peach', 'mango', 'berry', 'lemon', 'bring', 'spend', 'quote', 'squat', 'reach', 'types', 'words',
'human', 'brain', 'heart', 'watch','beard', 'turns','coins', 'stone', 'table', 'chair', 'cloud', 'flame', 'swing',
'light', 'dance', 'house', 'three', 'marks'];
    const maxAttempts = 6;
    let currentAttempt = 0;
    let selectedWord = '';
    let boardElement = document.getElementById('board');
    let guessInput = document.getElementById('guessInput');
    let submitButton = document.getElementById('submitGuess');
    let messageElement = document.getElementById('message');
    let newGameButton = document.getElementById('newGameButton');
    
    function startNewGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        currentAttempt = 0;
        messageElement.textContent = '';
        guessInput.value = '';
        guessInput.disabled = false;
        newGameButton.style.display = 'none';
        boardElement.innerHTML = ''; // Clear previous guesses
    
        for (let i = 0; i < maxAttempts; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }
            boardElement.appendChild(row);
        }
    }
    
    function displayGuess(guess) {
        const row = document.getElementsByClassName('row')[currentAttempt];
        const cells = row.getElementsByClassName('cell');
    
        for (let i = 0; i < guess.length; i++) {
            cells[i].textContent = guess[i];
            if (guess[i] === selectedWord[i]) {
                cells[i].classList.add('correct');
            } else if (selectedWord.includes(guess[i])) {
                cells[i].classList.add('wrong-position');
            } else {
                cells[i].classList.add('wrong');
            }
        }
    
        currentAttempt++;
    
        if (guess === selectedWord) {
            messageElement.textContent = 'Congratulations! You guessed the word!';
            guessInput.disabled = true;
            newGameButton.style.display = 'block';
        } else if (currentAttempt === maxAttempts) {
            messageElement.textContent = `Game Over! The word was "${selectedWord}".`;
            guessInput.disabled = true;
            newGameButton.style.display = 'block';
        }
    }
    
    submitButton.addEventListener('click', function () {
        const guess = guessInput.value.toLowerCase();
        if (guess.length === 5) {
            displayGuess(guess);
            guessInput.value = '';
        } else {
            alert('Please enter a valid 5-letter word from the list!');
        }
    });
    
    newGameButton.addEventListener('click', startNewGame);
    
    // Start the game when the page loads
    window.onload = startNewGame;
    