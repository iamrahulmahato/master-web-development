document.addEventListener('DOMContentLoaded', () => {
    const flashcardsBtn = document.getElementById('flashcardsBtn');
    const quizBtn = document.getElementById('quizBtn');
    const addWordBtn = document.getElementById('addWordBtn');

    const flashcardsSection = document.getElementById('flashcardsSection');
    const quizSection = document.getElementById('quizSection');
    const addWordSection = document.getElementById('addWordSection');

    const flashcardsContainer = document.getElementById('flashcardsContainer');
    const quizContainer = document.getElementById('quizContainer');
    const quizFeedback = document.getElementById('quizFeedback');
    const showAnswerBtn = document.getElementById('showAnswerBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const addWordForm = document.getElementById('addWordForm');

    let words = [
        { word: 'Aberration', definition: 'A departure from what is normal, usual, or expected' },
        { word: 'Capitulate', definition: 'Cease to resist an opponent or an unwelcome demand; surrender' },
        { word: 'Debilitate', definition: 'Make (someone) weak and infirm' }
    ];

    function showSection(section) {
        flashcardsSection.classList.add('hidden');
        quizSection.classList.add('hidden');
        addWordSection.classList.add('hidden');
        section.classList.remove('hidden');
    }

    function loadFlashcards() {
        flashcardsContainer.innerHTML = '';
        words.forEach((wordObj, index) => {
            const card = document.createElement('div');
            card.className = 'flashcard';
    
            const wordElement = document.createElement('strong');
            wordElement.textContent = wordObj.word;
            card.appendChild(wordElement);
    
            const definitionParagraph = document.createElement('p');
            definitionParagraph.textContent = wordObj.definition;
            card.appendChild(definitionParagraph);
    
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            removeButton.setAttribute('data-index', index);
            removeButton.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'), 10);
                words.splice(index, 1);
                loadFlashcards();
            });
            card.appendChild(removeButton);
    
            flashcardsContainer.appendChild(card);
        });
    }

    let currentWordIndex;

    function loadQuiz() {
        quizFeedback.innerHTML = '';
        currentWordIndex = Math.floor(Math.random() * words.length);
        const { word } = words[currentWordIndex];
        quizContainer.innerHTML = `<p>What is the definition of <strong>${word}</strong>?</p>`;
    }

    flashcardsBtn.addEventListener('click', () => {
        showSection(flashcardsSection);
        loadFlashcards();
    });

    quizBtn.addEventListener('click', () => {
        showSection(quizSection);
        loadQuiz();
    });

    addWordBtn.addEventListener('click', () => {
        showSection(addWordSection);
    });

    showAnswerBtn.addEventListener('click', () => {
        const { definition } = words[currentWordIndex];
        quizFeedback.innerHTML = `<p>The definition of the word is: <strong>${definition}</strong></p>`;
    });

    nextQuestionBtn.addEventListener('click', () => {
        loadQuiz();
    });

    addWordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const wordInput = document.getElementById('word');
        const definitionInput = document.getElementById('definition');
        const newWord = {
            word: wordInput.value,
            definition: definitionInput.value
        };
        words.push(newWord);
        wordInput.value = '';
        definitionInput.value = '';
        alert('Word added successfully!');
    });
    showSection(flashcardsSection);
    loadFlashcards();
});