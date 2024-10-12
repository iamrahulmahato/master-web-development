
const questions = {
    movies: [
        { question: "What is the highest-grossing film of all time?", options: ["Avatar", "Titanic", "Star Wars", "Avengers: Endgame"], answer: "Avatar" },
        { question: "Who directed 'Inception'?", options: ["Christopher Nolan", "Steven Spielberg", "Martin Scorsese", "James Cameron"], answer: "Christopher Nolan" },
        { question: "Which movie features the song 'My Heart Will Go On'?", options: ["Titanic", "The Bodyguard", "Armageddon", "Ghost"], answer: "Titanic" },
        { question: "Who played Jack Sparrow in 'Pirates of the Caribbean'?", options: ["Johnny Depp", "Orlando Bloom", "Hugh Jackman", "Brad Pitt"], answer: "Johnny Depp" },
        { question: "What is the name of the second 'Harry Potter' movie?", options: ["Chamber of Secrets", "Goblet of Fire", "Sorcerer's Stone", "Prisoner of Azkaban"], answer: "Chamber of Secrets" },
        { question: "Which animated movie is about a clownfish looking for his son?", options: ["Finding Nemo", "The Little Mermaid", "Shark Tale", "Moana"], answer: "Finding Nemo" },
        { question: "In which year was the first 'Toy Story' movie released?", options: ["1995", "1998", "2000", "2002"], answer: "1995" },
        { question: "Who played the Joker in 'The Dark Knight'?", options: ["Heath Ledger", "Joaquin Phoenix", "Jack Nicholson", "Jared Leto"], answer: "Heath Ledger" },
        { question: "Which movie won Best Picture at the 2020 Academy Awards?", options: ["Parasite", "1917", "Joker", "Once Upon a Time in Hollywood"], answer: "Parasite" },
        { question: "Which movie features the quote 'Here's looking at you, kid'?", options: ["Casablanca", "Gone with the Wind", "Citizen Kane", "The Godfather"], answer: "Casablanca" },
        { question: "Who directed the movie 'Pulp Fiction'?", options: ["Quentin Tarantino", "Martin Scorsese", "Steven Spielberg", "David Fincher"], answer: "Quentin Tarantino" },
        { question: "Which movie is about a man who ages in reverse?", options: ["The Curious Case of Benjamin Button", "Forrest Gump", "The Time Traveler's Wife", "Inception"], answer: "The Curious Case of Benjamin Button" },
        { question: "Which actress played Katniss Everdeen in 'The Hunger Games'?", options: ["Jennifer Lawrence", "Emma Stone", "Scarlett Johansson", "Brie Larson"], answer: "Jennifer Lawrence" },
        { question: "Which 1994 movie features a prisoner who escapes from Shawshank?", options: ["The Shawshank Redemption", "The Green Mile", "A Beautiful Mind", "Se7en"], answer: "The Shawshank Redemption" },
        { question: "Which musical movie tells the story of a girl named Sandy and a boy named Danny?", options: ["Grease", "West Side Story", "The Sound of Music", "La La Land"], answer: "Grease" },
        { question: "Which movie features the quote 'I'll be back'?", options: ["The Terminator", "Predator", "Total Recall", "RoboCop"], answer: "The Terminator" },
        { question: "What is the name of the kingdom in the movie 'Frozen'?", options: ["Arendelle", "Narnia", "Hogwarts", "Oz"], answer: "Arendelle" },
        { question: "Which Marvel movie features the character Black Panther?", options: ["Black Panther", "Avengers: Infinity War", "Guardians of the Galaxy", "Spider-Man: Homecoming"], answer: "Black Panther" },
        { question: "Which actor plays the lead role in 'Mad Max: Fury Road'?", options: ["Tom Hardy", "Mel Gibson", "Christian Bale", "Chris Hemsworth"], answer: "Tom Hardy" },
        { question: "Which movie tells the story of a man stranded on Mars?", options: ["The Martian", "Gravity", "Interstellar", "Apollo 13"], answer: "The Martian" }
    ],
    
    countries: [
        { question: "Which country has the largest population?", options: ["India", "USA", "China", "Brazil"], answer: "China" },
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
        { question: "Which country is known as the Land of the Rising Sun?", options: ["Japan", "China", "South Korea", "Thailand"], answer: "Japan" },
        { question: "Which country is home to the kangaroo?", options: ["Australia", "New Zealand", "South Africa", "Canada"], answer: "Australia" },
        { question: "Which country has the longest coastline?", options: ["Canada", "Russia", "USA", "Australia"], answer: "Canada" },
        { question: "What is the largest country by area?", options: ["Russia", "Canada", "USA", "China"], answer: "Russia" },
        { question: "Which country is the smallest by area?", options: ["Vatican City", "Monaco", "Malta", "San Marino"], answer: "Vatican City" },
        { question: "What is the official language of Brazil?", options: ["Portuguese", "Spanish", "English", "French"], answer: "Portuguese" },
        { question: "Which country is famous for the Eiffel Tower?", options: ["France", "Italy", "Germany", "Spain"], answer: "France" },
        { question: "Which country has the most islands?", options: ["Sweden", "Indonesia", "Philippines", "Australia"], answer: "Sweden" },
        { question: "Which country is known for its pyramids?", options: ["Egypt", "Mexico", "Greece", "Jordan"], answer: "Egypt" },
        { question: "Which country is home to the Amazon Rainforest?", options: ["Brazil", "Peru", "Colombia", "Venezuela"], answer: "Brazil" },
        { question: "Which country is both a continent and a country?", options: ["Australia", "Greenland", "Antarctica", "Iceland"], answer: "Australia" },
        { question: "Which country has the most time zones?", options: ["France", "USA", "Russia", "China"], answer: "France" },
        { question: "Which European country is famous for its fjords?", options: ["Norway", "Sweden", "Iceland", "Denmark"], answer: "Norway" },
        { question: "Which country is the leading producer of coffee?", options: ["Brazil", "Vietnam", "Colombia", "Ethiopia"], answer: "Brazil" },
        { question: "Which country has the highest number of UNESCO World Heritage Sites?", options: ["Italy", "China", "India", "Spain"], answer: "Italy" },
        { question: "Which African country was formerly known as Abyssinia?", options: ["Ethiopia", "Sudan", "Nigeria", "Kenya"], answer: "Ethiopia" },
        { question: "Which country shares the longest border with the United States?", options: ["Canada", "Mexico", "Russia", "Cuba"], answer: "Canada" },
        { question: "What is the capital of Australia?", options: ["Canberra", "Sydney", "Melbourne", "Brisbane"], answer: "Canberra" }
    ],
    languages: [
        { question: "Which language is the most spoken in the world?", options: ["Spanish", "Mandarin", "English", "Hindi"], answer: "Mandarin" },
        { question: "What is the official language of Brazil?", options: ["Spanish", "Portuguese", "English", "French"], answer: "Portuguese" },
        { question: "Which language is primarily spoken in Argentina?", options: ["Spanish", "Portuguese", "French", "Italian"], answer: "Spanish" },
        { question: "What is the official language of Egypt?", options: ["Arabic", "English", "French", "Swahili"], answer: "Arabic" },
        { question: "Which language is known for having the largest alphabet?", options: ["Khmer", "Russian", "Greek", "Korean"], answer: "Khmer" },
        { question: "Which European language has the most native speakers?", options: ["Russian", "German", "French", "Spanish"], answer: "Russian" },
        { question: "In which country is Dutch the official language?", options: ["Netherlands", "Belgium", "Denmark", "Sweden"], answer: "Netherlands" },
        { question: "Which language is written from right to left?", options: ["Arabic", "Mandarin", "Hindi", "Russian"], answer: "Arabic" },
        { question: "What is the official language of Iran?", options: ["Persian (Farsi)", "Arabic", "Urdu", "Turkish"], answer: "Persian (Farsi)" },
        { question: "Which language has the most words?", options: ["English", "Mandarin", "Spanish", "French"], answer: "English" },
        { question: "Which country has four official languages?", options: ["Switzerland", "Canada", "Belgium", "India"], answer: "Switzerland" },
        { question: "Which is the primary language spoken in Mexico?", options: ["Spanish", "Portuguese", "Nahuatl", "English"], answer: "Spanish" },
        { question: "What is the second most spoken language in the world?", options: ["Spanish", "English", "Mandarin", "Hindi"], answer: "Spanish" },
        { question: "Which language family does Hindi belong to?", options: ["Indo-European", "Afro-Asiatic", "Sino-Tibetan", "Altaic"], answer: "Indo-European" },
        { question: "What is the official language of Turkey?", options: ["Turkish", "Arabic", "Persian", "Greek"], answer: "Turkish" },
        { question: "Which language is considered the easiest for English speakers to learn?", options: ["Spanish", "Mandarin", "Japanese", "Russian"], answer: "Spanish" },
        { question: "Which country has the most official languages?", options: ["South Africa", "India", "Switzerland", "Belgium"], answer: "South Africa" },
        { question: "Which language is the basis for most programming languages?", options: ["English", "German", "Chinese", "French"], answer: "English" },
        { question: "Which language is the official language of Vatican City?", options: ["Latin", "Italian", "Spanish", "French"], answer: "Latin" },
        { question: "What is the official language of Canada alongside English?", options: ["French", "German", "Spanish", "Inuit"], answer: "French" }
    
    ],
    GeneralMaths: [
        { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: "12" },
        { question: "What is 9 * 6?", options: ["54", "52", "60", "56"], answer: "54" },
        { question: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: "9" },
        { question: "What is 15% of 200?", options: ["30", "25", "35", "20"], answer: "30" },
        { question: "What is the value of pi up to two decimal places?", options: ["3.14", "3.15", "3.13", "3.12"], answer: "3.14" },
        { question: "What is 12 / 4?", options: ["3", "2", "4", "6"], answer: "3" },
        { question: "If x + 3 = 10, what is x?", options: ["5", "7", "6", "3"], answer: "7" },
        { question: "What is 2^3?", options: ["6", "7", "8", "9"], answer: "8" },
        { question: "What is 100 - 45?", options: ["55", "65", "45", "75"], answer: "55" },
        { question: "What is the next prime number after 7?", options: ["8", "9", "11", "10"], answer: "11" },
        { question: "What is 20% of 150?", options: ["30", "25", "35", "20"], answer: "30" },
        { question: "What is the perimeter of a square with a side length of 4?", options: ["12", "16", "20", "24"], answer: "16" },
        { question: "What is the area of a triangle with a base of 10 and a height of 5?", options: ["25", "30", "35", "20"], answer: "25" },
        { question: "If a rectangle has a length of 8 and a width of 3, what is its area?", options: ["24", "32", "20", "28"], answer: "24" },
        { question: "What is the sum of angles in a triangle?", options: ["90", "180", "360", "270"], answer: "180" },
        { question: "What is 7 * 8?", options: ["54", "56", "64", "72"], answer: "56" },
        { question: "What is 3 + 3 * 3?", options: ["9", "12", "6", "15"], answer: "12" },
        { question: "What is the absolute value of -5?", options: ["5", "-5", "0", "10"], answer: "5" },
        { question: "What is the mode of the following set of numbers: 1, 2, 2, 3, 4?", options: ["1", "2", "3", "4"], answer: "2" },
        { question: "What is the value of x in the equation 2x = 10?", options: ["2", "3", "5", "4"], answer: "5" },
        { question: "What is the 10th Fibonacci number?", options: ["55", "34", "21", "13"], answer: "55" },
        { question: "What is the sum of the first 10 natural numbers?", options: ["45", "50", "55", "60"], answer: "55" }
    ],
        GeneralScience: [
        { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "H2"], answer: "H2O" },
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"], answer: "Mitochondria" },
        { question: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
        { question: "What is the process by which plants make their food using sunlight?", options: ["Respiration", "Digestion", "Photosynthesis", "Transpiration"], answer: "Photosynthesis" },
        { question: "What is the main gas found in the air we breathe?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: "Nitrogen" },
        { question: "What is the human body's largest organ?", options: ["Heart", "Liver", "Skin", "Lung"], answer: "Skin" },
        { question: "What is the most abundant element in the universe?", options: ["Oxygen", "Hydrogen", "Carbon", "Helium"], answer: "Hydrogen" },
        { question: "What is the freezing point of water?", options: ["0 degrees Celsius", "100 degrees Celsius", "32 degrees Celsius", "50 degrees Celsius"], answer: "0 degrees Celsius" },
        { question: "What type of animal is a dolphin?", options: ["Fish", "Amphibian", "Mammal", "Reptile"], answer: "Mammal" },
        { question: "Which organ is responsible for pumping blood throughout the body?", options: ["Brain", "Kidney", "Liver", "Heart"], answer: "Heart" },
        { question: "What is the basic unit of life?", options: ["Atom", "Molecule", "Cell", "Organ"], answer: "Cell" },
        { question: "What do you call the change of state from liquid to gas?", options: ["Melting", "Condensation", "Evaporation", "Sublimation"], answer: "Evaporation" },
        { question: "Which vitamin is produced when a person is exposed to sunlight?", options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], answer: "Vitamin D" },
        { question: "What part of the plant is responsible for photosynthesis?", options: ["Root", "Stem", "Leaf", "Flower"], answer: "Leaf" },
        { question: "What force keeps us grounded on Earth?", options: ["Magnetism", "Gravity", "Friction", "Inertia"], answer: "Gravity" },
        { question: "What is the chemical formula for table salt?", options: ["KCl", "NaCl", "CaCO3", "HCl"], answer: "NaCl" },
        { question: "Which planet is known for its rings?", options: ["Mars", "Jupiter", "Saturn", "Neptune"], answer: "Saturn" },
        { question: "What is the process by which a solid turns directly into a gas?", options: ["Evaporation", "Condensation", "Sublimation", "Melting"], answer: "Sublimation" },
        { question: "What is the primary component of the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], answer: "Nitrogen" },
        { question: "What type of bond involves the sharing of electron pairs between atoms?", options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"], answer: "Covalent bond" },
        { question: "What is the main source of energy for the Earth?", options: ["Moon", "Sun", "Wind", "Water"], answer: "Sun" },
        { question: "What is the most abundant gas in the Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], answer: "Nitrogen" },
        { question: "What is the study of living organisms called?", options: ["Biology", "Physics", "Chemistry", "Geology"], answer: "Biology" },
        { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" }
    ],
    English: [
        { question: "What is the synonym of 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], answer: "Joyful" },
        { question: "Which of the following is a noun?", options: ["Quickly", "Run", "Happiness", "Blue"], answer: "Happiness" },
        { question: "What is the past tense of 'go'?", options: ["Goed", "Going", "Went", "Go"], answer: "Went" },
        { question: "Which of the following sentences is correct?", options: ["She don't like pizza.", "She doesn't likes pizza.", "She doesn't like pizza.", "She not like pizza."], answer: "She doesn't like pizza." },
        { question: "What is the opposite of 'difficult'?", options: ["Hard", "Easy", "Challenging", "Tough"], answer: "Easy" },
        { question: "Which word is spelled correctly?", options: ["Recieve", "Receive", "Receeve", "Recive"], answer: "Receive" },
        { question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childrens", "Childer"], answer: "Children" },
        { question: "Which of the following is an adverb?", options: ["Quickly", "Quick", "Quickness", "Quicker"], answer: "Quickly" },
        { question: "What is the main theme of Shakespeare's 'Romeo and Juliet'?", options: ["War", "Love", "Friendship", "Betrayal"], answer: "Love" },
        { question: "Which word means the same as 'big'?", options: ["Small", "Huge", "Tiny", "Little"], answer: "Huge" },
        { question: "Which of the following is an example of a simile?", options: ["He is a lion in battle.", "She runs like the wind.", "Time is a thief.", "The stars danced in the sky."], answer: "She runs like the wind." },
        { question: "What is the correct form of the verb in this sentence: 'She _____ to the store yesterday'?", options: ["Go", "Gone", "Went", "Goes"], answer: "Went" },
        { question: "Which of the following sentences uses a metaphor?", options: ["The world is a stage.", "He is as brave as a lion.", "The wind whispered through the trees.", "She runs fast like a cheetah."], answer: "The world is a stage." },
        { question: "What is the main purpose of a thesis statement?", options: ["To entertain the reader", "To provide background information", "To state the main idea of an essay", "To summarize the conclusion"], answer: "To state the main idea of an essay" },
        { question: "What part of speech is the word 'beautiful'?", options: ["Noun", "Adjective", "Verb", "Adverb"], answer: "Adjective" },
        { question: "Which of the following sentences is in passive voice?", options: ["The cat chased the mouse.", "The mouse was chased by the cat.", "The cat is chasing the mouse.", "The cat chases mice."], answer: "The mouse was chased by the cat." },
        { question: "What does the prefix 'un-' mean?", options: ["Again", "Not", "Before", "Together"], answer: "Not" },
        { question: "Which of the following sentences is a question?", options: ["I am going to the park.", "Are you going to the park?", "The park is beautiful.", "She likes to walk in the park."], answer: "Are you going to the park?" },
        { question: "Which punctuation mark is used to show possession?", options: ["Comma", "Period", "Apostrophe", "Colon"], answer: "Apostrophe" },
        { question: "What is the antonym of 'generous'?", options: ["Kind", "Stingy", "Wealthy", "Helpful"], answer: "Stingy" }
    ]
    
};

let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;

document.getElementById('start-button').addEventListener('click', showCategorySelection);
document.querySelectorAll('.category-button').forEach(button => button.addEventListener('click', selectCategory));
document.getElementById('next-button').addEventListener('click', nextQuestion);
document.getElementById('play-again-button').addEventListener('click', playAgain);

function showCategorySelection() {
    // Hide the start button, show category selection
    document.getElementById('start-container').classList.add('hidden');
    document.getElementById('category-container').classList.remove('hidden');
}

function selectCategory(event) {
    // Get the selected category from the data-category attribute of the button
    currentCategory = event.target.getAttribute('data-category');

    // Reset score and question index
    score = 0;
    currentQuestionIndex = 0;

    // Hide category selection and show the question container
    document.getElementById('category-container').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');
    
    // Update the score display
    document.getElementById('score').innerText = `Score: ${score}`;

    // Show the first question
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentCategory][currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;

    // Clear previous options
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    // Display new options
    currentQuestion.options.forEach(option => {
        const optionButton = document.createElement('div');
        optionButton.innerText = option;
        optionButton.classList.add('option');
        optionButton.addEventListener('click', () => selectOption(option));
        optionsContainer.appendChild(optionButton);
    });

    // Hide the next button until an option is selected
    document.getElementById('next-button').classList.add('hidden');
}

function selectOption(option) {
    const currentQuestion = questions[currentCategory][currentQuestionIndex];

    // Update score if the selected option is correct
    if (option === currentQuestion.answer) {
        score++;
    }

    document.getElementById('score').innerText = `Score: ${score}`;

    // Show the "Next Question" button
    document.getElementById('next-button').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;

    // Check if there are more questions in the category
    if (currentQuestionIndex < questions[currentCategory].length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    // Hide the question container and show the final score
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('end-container').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
}

function playAgain() {
    // Hide the end container, reset the game, and show the start container
    document.getElementById('end-container').classList.add('hidden');
    document.getElementById('start-container').classList.remove('hidden');
}
