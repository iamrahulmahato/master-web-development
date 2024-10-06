// script.js 

const words = [ 
    "react", 
    "angular", 
    "javascript", 
    "bootstrap", 
    "tailwind", 
    "vue", 
    "typescript", 
    "jquery", 
    "sass", 
    "nodejs", 
    "express", 
    "mongodb", 
    "firebase", 
    "graphql", 
    "docker", 
    "redux", 
    "nextjs", 
    "webpack", 
    "materialui", 
    "emotion",
]; 

const hints = [ 
    "JavaScript framework", 
    "JavaScript Framework", 
    "Scripting Language", 
    "Styling Library", 
    "Styling Library", 
    "JavaScript Framework", 
    "Typed JavaScript Superset", 
    "JavaScript Library", 
    "CSS Preprocessor", 
    "JavaScript Runtime Environment", 
    "Node.js Framework", 
    "NoSQL Database", 
    "Backend as a Service (BaaS)", 
    "API Query Language", 
    "Containerization Platform", 
    "State Management Library", 
    "React Framework", 
    "JavaScript Module Bundler", 
    "React UI Framework", 
    "CSS-in-JS Library", 
];


// Initialize display word 
let displayWord = ""; 

// Function to shuffle letters 
function shuffle(str) { 
	strArray = Array.from(str); 
	for (let i = 0; i < strArray.length - 1; ++i) { 
		let j = Math.floor(Math.random() * strArray.length); 
		// Swap letters 
		let temp = strArray[i]; 
		strArray[i] = strArray[j]; 
		strArray[j] = temp; 
	} 
	return strArray.join(" "); 
} 

// Function to check input and display result 
function check() { 
	let input = document.getElementById("input"); 
	let output = document.getElementById("output"); 
	if ( 
		input.value.toLocaleLowerCase() === 
		displayWord.toLocaleLowerCase() 
	) 
		output.innerHTML = "Result: Correct"; 
	else output.innerHTML = "Result: Incorrect"; 
} 

// To refresh and show new word 
function refresh() { 
	index = Math.floor(Math.random() * 20); 
	displayWord = words[index]; 
	displayHint = hints[index]; 
	scrambleWord = 
		document.getElementById("scrambleWord"); 
	scrambleWord.innerText = 
		shuffle(displayWord).toUpperCase(); 
	let hint = document.getElementById("hint"); 
	hint.innerHTML = "<b>Hint:</b> " + displayHint; 
	document.getElementById("output").innerText = "Result:"; 
} 

// Function call when page load for first time 
refresh();
