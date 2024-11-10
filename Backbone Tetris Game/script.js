//Define 10x20 grid as the board
var grid = [
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
];

//Block shapes
var shapes = {
	I: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
	J: [[2,0,0], [2,2,2], [0,0,0]],
	L: [[0,0,3], [3,3,3], [0,0,0]],
	O: [[4,4], [4,4]],
	S: [[0,5,5], [5,5,0], [0,0,0]],
	T: [[0,6,0], [6,6,6], [0,0,0]],
	Z: [[7,7,0], [0,7,7], [0,0,0]]
};

//Block colors
var colors = ["F92338", "C973FF", "1C76BC", "FEE356", "53D504", "36E0FF", "F8931D"];

//Used to help create a seeded generated random number for choosing shapes. makes results deterministic (reproducible) for debugging
var rndSeed = 1;

//BLOCK SHAPES
//coordinates and shape parameter of current block we can update
var currentShape = {x: 0, y: 0, shape: undefined};
//store shape of upcoming block
var upcomingShape;
//stores shapes
var bag = [];
//index for shapes in the bag
var bagIndex = 0;

//GAME VALUES
//Game score
var score = 0;
// game speed
var speed = 500;
// boolean for changing game speed
var changeSpeed = false;
//for storing current state, we can load later
var saveState;
//stores current game state
var roundState;
//list of available game speeds
var speeds = [500,100,1,0];
//inded in game speed array
var speedIndex = 0;
//turn ai on or off
var ai = true;
//drawing game vs updating algorithms
var draw = true;
//how many so far?
var movesTaken = 0;
//max number of moves allowed in a generation
var moveLimit = 500;
//consists of move the 7 move parameters
var moveAlgorithm = {};
//set to highest rate move 
var inspectMoveSelection = false;


//GENETIC ALGORITHM VALUES
//stores number of genomes, init at 50 
var populationSize = 50;
//stores genomes
var genomes = [];
//index of current genome in genomes array
var currentGenome = -1;
//generation number
var generation = 0;
//stores values for a generation
var archive = {
	populationSize: 0,
	currentGeneration: 0,
	elites: [],
	genomes: []
};
//rate of mutation
var mutationRate = 0.05;
//helps calculate mutation
var mutationStep = 0.2;


//main function, called on load
function initialize() {
	//init pop size
	archive.populationSize = populationSize;
	//get the next available shape from the bag
	nextShape();
	//applies the shape to the grid
	applyShape();
	//set both save state and current state from the game
	saveState = getState();
	roundState = getState();
	//create an initial population of genomes
	createInitialPopulation();
	//the game loop
	var loop = function(){
		//boolean for changing game speed
		if (changeSpeed) {
			//restart the clock
			//stop time
			clearInterval(interval);
			//set time, like a digital watch
			interval = setInterval(loop, speed);
			//and don't change it
			changeInterval = false;
		}
		if (speed === 0) {
			//no need to draw on screen elements
			draw = false;
			//updates the game (update fitness, make a move, evaluate next move)
			update();
			update();
			update();
		} else {
			//draw the elements
			draw = true;
		}
		//update regardless
		update();
		if (speed === 0) {
			//now draw elements
			draw = true;
			//now update the score
			updateScore();
		}
	};
	//timer interval
	var interval = setInterval(loop, speed);
}
document.onLoad = initialize();


//key options
window.onkeydown = function (event) {

	var characterPressed = String.fromCharCode(event.keyCode);
	if (event.keyCode == 38) {
		rotateShape();
	} else if (event.keyCode == 40) {
		moveDown();
	} else if (event.keyCode == 37) {
		moveLeft();
	} else if (event.keyCode == 39) {
		moveRight();
	} else if (shapes[characterPressed.toUpperCase()] !== undefined) {
		removeShape();
		currentShape.shape = shapes[characterPressed.toUpperCase()];
		applyShape();
	} else if (characterPressed.toUpperCase() == "Q") {
		saveState = getState();
	} else if (characterPressed.toUpperCase() == "W") {
		loadState(saveState);
	} else if (characterPressed.toUpperCase() == "D") {
		//slow down
		speedIndex--;
		if (speedIndex < 0) {
			speedIndex = speeds.length - 1;
		}
		speed = speeds[speedIndex];
		changeSpeed = true;
	} else if (characterPressed.toUpperCase() == "E") {
		//speed up
		speedIndex++;
		if (speedIndex >= speeds.length) {
			speedIndex = 0;
		}
		//adjust speed index
		speed = speeds[speedIndex];
		changeSpeed = true;
		//Turn on/off AI
	} else if (characterPressed.toUpperCase() == "A") {
		ai = !ai;
	} else if (characterPressed.toUpperCase() == "R") {
		//load saved generation values
		loadArchive(prompt("Insert archive:"));
	} else if (characterPressed.toUpperCase() == "G") {
		if (localStorage.getItem("archive") === null) {
			alert("No archive saved. Archives are saved after a generation has passed, and remain across sessions. Try again once a generation has passed");
		} else {
			prompt("Archive from last generation (including from last session):", localStorage.getItem("archive"));
		}
	} else if (characterPressed.toUpperCase() == "F") {
		//?
		inspectMoveSelection = !inspectMoveSelection;
	} else {
		return true;
	}
	//outputs game state to the screen (post key press)
	output();
	return false;
};

/**
 * Creates the initial population of genomes, each with random genes.
 */
 function createInitialPopulation() {
 	//inits the array
 	genomes = [];
 	//for a given population size
 	for (var i = 0; i < populationSize; i++) {
 		//randomly initialize the 7 values that make up a genome
 		//these are all weight values that are updated through evolution
 		var genome = {
 			//unique identifier for a genome
 			id: Math.random(),
 			//The weight of each row cleared by the given move. the more rows that are cleared, the more this weight increases
 			rowsCleared: Math.random() - 0.5,
 			//the absolute height of the highest column to the power of 1.5
 			//added so that the algorithm can be able to detect if the blocks are stacking too high
 			weightedHeight: Math.random() - 0.5,
 			//The sum of all the column’s heights
 			cumulativeHeight: Math.random() - 0.5,
 			//the highest column minus the lowest column
 			relativeHeight: Math.random() - 0.5,
 			//the sum of all the empty cells that have a block above them (basically, cells that are unable to be filled)
 			holes: Math.random() * 0.5,
 			// the sum of absolute differences between the height of each column 
 			//(for example, if all the shapes on the grid lie completely flat, then the roughness would equal 0).
 			roughness: Math.random() - 0.5,
 		};
 		//add them to the array
 		genomes.push(genome);
 	}
 	evaluateNextGenome();
 }

/**
 * Evaluates the next genome in the population. If there is none, evolves the population.
 */
 function evaluateNextGenome() {
 	//increment index in genome array
 	currentGenome++;
 	//If there is none, evolves the population.
 	if (currentGenome == genomes.length) {
 		evolve();
 	}
 	//load current gamestate
 	loadState(roundState);
 	//reset moves taken
 	movesTaken = 0;
 	//and make the next move
 	makeNextMove();
 }

/**
 * Evolves the entire population and goes to the next generation.
 */
 function evolve() {

 	console.log("Generation " + generation + " evaluated.");
 	//reset current genome for new generation
 	currentGenome = 0;
 	//increment generation
 	generation++;
 	//resets the game
 	reset();
 	//gets the current game state
 	roundState = getState();
 	//sorts genomes in decreasing order of fitness values
 	genomes.sort(function(a, b) {
 		return b.fitness - a.fitness;
 	});
 	//add a copy of the fittest genome to the elites list
 	archive.elites.push(clone(genomes[0]));
 	console.log("Elite's fitness: " + genomes[0].fitness);

 	//remove the tail end of genomes, focus on the fittest
 	while(genomes.length > populationSize / 2) {
 		genomes.pop();
 	}
 	//sum of the fitness for each genome
 	var totalFitness = 0;
 	for (var i = 0; i < genomes.length; i++) {
 		totalFitness += genomes[i].fitness;
 	}

 	//get a random index from genome array
	function getRandomGenome() {
		return genomes[randomWeightedNumBetween(0, genomes.length - 1)];
	}
	//create children array
	var children = [];
	//add the fittest genome to array
	children.push(clone(genomes[0]));
	//add population sized amount of children
	while (children.length < populationSize) {
		//crossover between two random genomes to make a child
		children.push(makeChild(getRandomGenome(), getRandomGenome()));
	}
	//create new genome array
	genomes = [];
	//to store all the children in
	genomes = genomes.concat(children);
	//store this in our archive
	archive.genomes = clone(genomes);
	//and set current gen
	archive.currentGeneration = clone(generation);
	console.log(JSON.stringify(archive));
	//store archive, thanks JS localstorage! (short term memory)
	localStorage.setItem("archive", JSON.stringify(archive));
}

/**
 * Creates a child genome from the given parent genomes, and then attempts to mutate the child genome.
 * @param  {Genome} mum The first parent genome.
 * @param  {Genome} dad The second parent genome.
 * @return {Genome}     The child genome.
 */
 function makeChild(mum, dad) {
 	//init the child given two genomes (its 7 parameters + initial fitness value)
 	var child = {
 		//unique id
 		id : Math.random(),
 		//all these params are randomly selected between the mom and dad genome
 		rowsCleared: randomChoice(mum.rowsCleared, dad.rowsCleared),
 		weightedHeight: randomChoice(mum.weightedHeight, dad.weightedHeight),
 		cumulativeHeight: randomChoice(mum.cumulativeHeight, dad.cumulativeHeight),
 		relativeHeight: randomChoice(mum.relativeHeight, dad.relativeHeight),
 		holes: randomChoice(mum.holes, dad.holes),
 		roughness: randomChoice(mum.roughness, dad.roughness),
 		//no fitness. yet.
 		fitness: -1
 	};
 	//mutation time!

 	//we mutate each parameter using our mutationstep
 	if (Math.random() < mutationRate) {
 		child.rowsCleared = child.rowsCleared + Math.random() * mutationStep * 2 - mutationStep;
 	}
 	if (Math.random() < mutationRate) {
 		child.weightedHeight = child.weightedHeight + Math.random() * mutationStep * 2 - mutationStep;
 	}
 	if (Math.random() < mutationRate) {
 		child.cumulativeHeight = child.cumulativeHeight + Math.random() * mutationStep * 2 - mutationStep;
 	}
 	if (Math.random() < mutationRate) {
 		child.relativeHeight = child.relativeHeight + Math.random() * mutationStep * 2 - mutationStep;
 	}
 	if (Math.random() < mutationRate) {
 		child.holes = child.holes + Math.random() * mutationStep * 2 - mutationStep;
 	}
 	if (Math.random() < mutationRate) {
 		child.roughness = child.roughness + Math.random() * mutationStep * 2 - mutationStep;
 	}
 	return child;
 }

/**
 * Returns an array of all the possible moves that could occur in the current state, rated by the parameters of the current genome.
 * @return {Array} An array of all the possible moves that could occur.
 */
 function getAllPossibleMoves() {
 	var lastState = getState();
 	var possibleMoves = [];
 	var possibleMoveRatings = [];
 	var iterations = 0;
 	//for each possible rotation
 	for (var rots = 0; rots < 4; rots++) {

 		var oldX = [];
 		//for each iteration
 		for (var t = -5; t <= 5; t++) {
 			iterations++;
 			loadState(lastState);
 			//rotate shape
 			for (var j = 0; j < rots; j++) {
 				rotateShape();
 			}
 			//move left
 			if (t < 0) {
 				for (var l = 0; l < Math.abs(t); l++) {
 					moveLeft();
 				}
 			//move right
 			} else if (t > 0) {
 				for (var r = 0; r < t; r++) {
 					moveRight();
 				}
 			}
 			//if the shape has moved at all
 			if (!contains(oldX, currentShape.x)) {
 				//move it down
 				var moveDownResults = moveDown();
 				while (moveDownResults.moved) {
 					moveDownResults = moveDown();
 				}
 				//set the 7 parameters of a genome
 				var algorithm = {
 					rowsCleared: moveDownResults.rowsCleared,
 					weightedHeight: Math.pow(getHeight(), 1.5),
 					cumulativeHeight: getCumulativeHeight(),
 					relativeHeight: getRelativeHeight(),
 					holes: getHoles(),
 					roughness: getRoughness()
 				};
 				//rate each move
 				var rating = 0;
 				rating += algorithm.rowsCleared * genomes[currentGenome].rowsCleared;
 				rating += algorithm.weightedHeight * genomes[currentGenome].weightedHeight;
 				rating += algorithm.cumulativeHeight * genomes[currentGenome].cumulativeHeight;
 				rating += algorithm.relativeHeight * genomes[currentGenome].relativeHeight;
 				rating += algorithm.holes * genomes[currentGenome].holes;
 				rating += algorithm.roughness * genomes[currentGenome].roughness;
 				//if the move loses the game, lower its rating
 				if (moveDownResults.lose) {
 					rating -= 500;
 				}
 				//push all possible moves, with their associated ratings and parameter values to an array
 				possibleMoves.push({rotations: rots, translation: t, rating: rating, algorithm: algorithm});
 				//update the position of old X value
 				oldX.push(currentShape.x);
 			}
 		}
 	}
 	//get last state
 	loadState(lastState);
 	//return array of all possible moves
 	return possibleMoves;
 }

/**
 * Returns the highest rated move in the given array of moves.
 * @param  {Array} moves An array of possible moves to choose from.
 * @return {Move}       The highest rated move from the moveset.
 */
 function getHighestRatedMove(moves) {
 	//start these values off small
 	var maxRating = -10000000000000;
 	var maxMove = -1;
 	var ties = [];
 	//iterate through the list of moves
 	for (var index = 0; index < moves.length; index++) {
 		//if the current moves rating is higher than our maxrating
 		if (moves[index].rating > maxRating) {
 			//update our max values to include this moves values
 			maxRating = moves[index].rating;
 			maxMove = index;
 			//store index of this move
 			ties = [index];
 		} else if (moves[index].rating == maxRating) {
 			//if it ties with the max rating
 			//add the index to the ties array
 			ties.push(index);
 		}
 	}
 	//eventually we'll set the highest move value to this move var
	var move = moves[ties[0]];
	//and set the number of ties
	move.algorithm.ties = ties.length;
	return move;
}

/**
 * Makes a move, which is decided upon using the parameters in the current genome.
 */
 function makeNextMove() {
 	//increment number of moves taken
 	movesTaken++;
 	//if its over the limit of moves
 	if (movesTaken > moveLimit) {
 		//update this genomes fitness value using the game score
 		genomes[currentGenome].fitness = clone(score);
 		//and evaluates the next genome
 		evaluateNextGenome();
 	} else {
 		//time to make a move

 		//we're going to re-draw, so lets store the old drawing
 		var oldDraw = clone(draw);
 		draw = false;
 		//get all the possible moves
 		var possibleMoves = getAllPossibleMoves();
 		//lets store the current state since we will update it
 		var lastState = getState();
 		//whats the next shape to play
 		nextShape();
 		//for each possible move 
 		for (var i = 0; i < possibleMoves.length; i++) {
 			//get the best move. so were checking all the possible moves, for each possible move. moveception.
 			var nextMove = getHighestRatedMove(getAllPossibleMoves());
 			//add that rating to an array of highest rates moves
 			possibleMoves[i].rating += nextMove.rating;
 		}
 		//load current state
 		loadState(lastState);
 		//get the highest rated move ever
 		var move = getHighestRatedMove(possibleMoves);
 		//then rotate the shape as it says too
 		for (var rotations = 0; rotations < move.rotations; rotations++) {
 			rotateShape();
 		}
 		//and move left as it says
 		if (move.translation < 0) {
 			for (var lefts = 0; lefts < Math.abs(move.translation); lefts++) {
 				moveLeft();
 			}
 			//and right as it says
 		} else if (move.translation > 0) {
 			for (var rights = 0; rights < move.translation; rights++) {
 				moveRight();
 			}
 		}
 		//update our move algorithm
 		if (inspectMoveSelection) {
 			moveAlgorithm = move.algorithm;
 		}
 		//and set the old drawing to the current
 		draw = oldDraw;
 		//output the state to the screen
 		output();
 		//and update the score
 		updateScore();
 	}
 }

/**
 * Updates the game.
 */
 function update() {
 	//if we have our AI turned on and the current genome is nonzero
 	//make a move
 	if (ai && currentGenome != -1) {
 		//move the shape down
 		var results = moveDown();
 		//if that didn't do anything
 		if (!results.moved) {
 			//if we lost
 			if (results.lose) {
 				//update the fitness
 				genomes[currentGenome].fitness = clone(score);
 				//move on to the next genome
 				evaluateNextGenome();
 			} else {
 				//if we didnt lose, make the next move
 				makeNextMove();
 			}
 		}
 	} else {
        //else just move down
 		moveDown();
 	}
 	//output the state to the screen
 	output();
 	//and update the score
 	updateScore();
 }

/**
 * Moves the current shape down if possible.
 * @return {Object} The results of the movement of the piece.
 */
 function moveDown() {
 	//array of possibilities
 	var result = {lose: false, moved: true, rowsCleared: 0};
 	//remove the shape, because we will draw a new one
 	removeShape();
 	//move it down the y axis
 	currentShape.y++;
 	//if it collides with the grid
 	if (collides(grid, currentShape)) {
 		//update its position
 		currentShape.y--;
 		//apply (stick) it to the grid 
 		applyShape();
 		//move on to the next shape in the bag
 		nextShape();
 		//clear rows and get number of rows cleared
 		result.rowsCleared = clearRows();
 		//check again if this shape collides with our grid
 		if (collides(grid, currentShape)) {
 			//reset
 			result.lose = true;
 			if (ai) {
 			} else {
 				reset();
 			}
 		}
 		result.moved = false;
 	}
 	//apply shape, update the score and output the state to the screen
 	applyShape();
 	score++;
 	updateScore();
 	output();
 	return result;
 }

/**
 * Moves the current shape to the left if possible.
 */
 function moveLeft() {
 	//remove current shape, slide it over, if it collides though, slide it back
 	removeShape();
 	currentShape.x--;
 	if (collides(grid, currentShape)) {
 		currentShape.x++;
 	}
 	//apply the new shape
 	applyShape();
 }

/**
 * Moves the current shape to the right if possible.
 */
 //same deal
 function moveRight() {
 	removeShape();
 	currentShape.x++;
 	if (collides(grid, currentShape)) {
 		currentShape.x--;
 	}
 	applyShape();
 }

/**
 * Rotates the current shape clockwise if possible.
 */
 //slide it if we can, else return to original rotation
 function rotateShape() {
 	removeShape();
 	currentShape.shape = rotate(currentShape.shape, 1);
 	if (collides(grid, currentShape)) {
 		currentShape.shape = rotate(currentShape.shape, 3);
 	}
 	applyShape();
 }

/**
 * Clears any rows that are completely filled.
 */
 function clearRows() {
 	//empty array for rows to clear
 	var rowsToClear = [];
 	//for each row in the grid
 	for (var row = 0; row < grid.length; row++) {
 		var containsEmptySpace = false;
 		//for each column
 		for (var col = 0; col < grid[row].length; col++) {
 			//if its empty
 			if (grid[row][col] === 0) {
 				//set this value to true
 				containsEmptySpace = true;
 			}
 		}
 		//if none of the columns in the row were empty
 		if (!containsEmptySpace) {
 			//add the row to our list, it's completely filled!
 			rowsToClear.push(row);
 		}
 	}
 	//increase score for up to 4 rows. it maxes out at 12000
 	if (rowsToClear.length == 1) {
 		score += 400;
 	} else if (rowsToClear.length == 2) {
 		score += 1000;
 	} else if (rowsToClear.length == 3) {
 		score += 3000;
 	} else if (rowsToClear.length >= 4) {
 		score += 12000;
 	}
 	//new array for cleared rows
 	var rowsCleared = clone(rowsToClear.length);
 	//for each value
 	for (var toClear = rowsToClear.length - 1; toClear >= 0; toClear--) {
 		//remove the row from the grid
 		grid.splice(rowsToClear[toClear], 1);
 	}
 	//shift the other rows
 	while (grid.length < 20) {
 		grid.unshift([0,0,0,0,0,0,0,0,0,0]);
 	}
 	//return the rows cleared
 	return rowsCleared;
 }

/**
 * Applies the current shape to the grid.
 */
 function applyShape() {
 	//for each value in the current shape (row x column)
 	for (var row = 0; row < currentShape.shape.length; row++) {
 		for (var col = 0; col < currentShape.shape[row].length; col++) {
 			//if its non-empty
 			if (currentShape.shape[row][col] !== 0) {
 				//set the value in the grid to its value. Stick the shape in the grid!
 				grid[currentShape.y + row][currentShape.x + col] = currentShape.shape[row][col];
 			}
 		}
 	}
 }

/**
 * Removes the current shape from the grid.
 */
 //same deal but reverse
 function removeShape() {
 	for (var row = 0; row < currentShape.shape.length; row++) {
 		for (var col = 0; col < currentShape.shape[row].length; col++) {
 			if (currentShape.shape[row][col] !== 0) {
 				grid[currentShape.y + row][currentShape.x + col] = 0;
 			}
 		}
 	}
 }

/**
 * Cycles to the next shape in the bag.
 */
 function nextShape() {
 	//increment the bag index
 	bagIndex += 1;
 	//if we're at the start or end of the bag
 	if (bag.length === 0 || bagIndex == bag.length) {
 		//generate a new bag of genomes
 		generateBag();
 	}
 	//if almost at end of bag
 	if (bagIndex == bag.length - 1) {
 		//store previous seed
 		var prevSeed = rndSeed;
 		//generate upcoming shape
 		upcomingShape = randomProperty(shapes);
 		//set random seed
 		rndSeed = prevSeed;
 	} else {
 		//get the next shape from our bag
 		upcomingShape = shapes[bag[bagIndex + 1]];
 	}
 	//get our current shape from the bag
 	currentShape.shape = shapes[bag[bagIndex]];
 	//define its position
 	currentShape.x = Math.floor(grid[0].length / 2) - Math.ceil(currentShape.shape[0].length / 2);
 	currentShape.y = 0;
 }

/**
 * Generates the bag of shapes.
 */
 function generateBag() {
 	bag = [];
 	var contents = "";
 	//7 shapes
 	for (var i = 0; i < 7; i++) {
 		//generate shape randomly
 		var shape = randomKey(shapes);
 		while(contents.indexOf(shape) != -1) {
 			shape = randomKey(shapes);
 		}
 		//update bag with generated shape
 		bag[i] = shape;
 		contents += shape;
 	}
 	//reset bag index
 	bagIndex = 0;
 }

/**
 * Resets the game.
 */
 function reset() {
 	score = 0;
 	grid = [[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	[0,0,0,0,0,0,0,0,0,0],
 	];
 	moves = 0;
 	generateBag();
 	nextShape();
 }

/**
 * Determines if the given grid and shape collide with one another.
 * @param  {Grid} scene  The grid to check.
 * @param  {Shape} object The shape to check.
 * @return {Boolean} Whether the shape and grid collide.
 */
 function collides(scene, object) {
 	//for the size of the shape (row x column)
 	for (var row = 0; row < object.shape.length; row++) {
 		for (var col = 0; col < object.shape[row].length; col++) {
 			//if its not empty
 			if (object.shape[row][col] !== 0) {
 				//if it collides, return true
 				if (scene[object.y + row] === undefined || scene[object.y + row][object.x + col] === undefined || scene[object.y + row][object.x + col] !== 0) {
 					return true;
 				}
 			}
 		}
 	}
 	return false;
 }

//for rotating a shape, how many times should we rotate
 function rotate(matrix, times) {
 	//for each time
 	for (var t = 0; t < times; t++) {
 		//flip the shape matrix
 		matrix = transpose(matrix);
 		//and for the length of the matrix, reverse each column
 		for (var i = 0; i < matrix.length; i++) {
 			matrix[i].reverse();
 		}
 	}
 	return matrix;
 }
//flip row x column to column x row
 function transpose(array) {
 	return array[0].map(function(col, i) {
 		return array.map(function(row) {
 			return row[i];
 		});
 	});
 }

/**
 * Outputs the state to the screen.
 */
 function output() {
 	if (draw) {
 		var output = document.getElementById("output");
 		var html = "<h1>TetNet</h1><h5>Evolutionary approach to Tetris AI</h5>var grid = [";
 		var space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
 		for (var i = 0; i < grid.length; i++) {
 			if (i === 0) {
 				html += "[" + grid[i] + "]";
 			} else {
 				html += "<br />" + space + "[" + grid[i] + "]";
 			}
 		}
 		html += "];";
 		for (var c = 0; c < colors.length; c++) {
 			html = replaceAll(html, "," + (c + 1), ",<font color=\"" + colors[c] + "\">" + (c + 1) + "</font>");
 			html = replaceAll(html, (c + 1) + ",", "<font color=\"" + colors[c] + "\">" + (c + 1) + "</font>,");
 		}
 		output.innerHTML = html;
 	}
 }

/**
 * Updates the side information.
 */
 function updateScore() {
 	if (draw) {
 		var scoreDetails = document.getElementById("score");
 		var html = "<br /><br /><h2>&nbsp;</h2><h2>Score: " + score + "</h2>";
 		html += "<br /><b>--Upcoming--</b>";
 		for (var i = 0; i < upcomingShape.length; i++) {
 			var next =replaceAll((upcomingShape[i] + ""), "0", "&nbsp;");
 			html += "<br />&nbsp;&nbsp;&nbsp;&nbsp;" + next;
 		}
 		for (var l = 0; l < 4 - upcomingShape.length; l++) {
 			html += "<br />";
 		}
 		for (var c = 0; c < colors.length; c++) {
 			html = replaceAll(html, "," + (c + 1), ",<font color=\"" + colors[c] + "\">" + (c + 1) + "</font>");
 			html = replaceAll(html, (c + 1) + ",", "<font color=\"" + colors[c] + "\">" + (c + 1) + "</font>,");
 		}
 		html += "<br />Speed: " + speed;
 		if (ai) {
 			html += "<br />Moves: " + movesTaken + "/" + moveLimit;
 			html += "<br />Generation: " + generation;
 			html += "<br />Individual: " + (currentGenome + 1)  + "/" + populationSize;
 			html += "<br /><pre style=\"font-size:12px\">" + JSON.stringify(genomes[currentGenome], null, 2) + "</pre>";
 			if (inspectMoveSelection) {
 				html += "<br /><pre style=\"font-size:12px\">" + JSON.stringify(moveAlgorithm, null, 2) + "</pre>";
 			}
 		}
 		html = replaceAll(replaceAll(replaceAll(html, "&nbsp;,", "&nbsp;&nbsp;"), ",&nbsp;", "&nbsp;&nbsp;"), ",", "&nbsp;");
 		scoreDetails.innerHTML = html;
 	}
 }

/**
 * Returns the current game state in an object.
 * @return {State} The current game state.
 */
 function getState() {
 	var state = {
 		grid: clone(grid),
 		currentShape: clone(currentShape),
 		upcomingShape: clone(upcomingShape),
 		bag: clone(bag),
 		bagIndex: clone(bagIndex),
 		rndSeed: clone(rndSeed),
 		score: clone(score)
 	};
 	return state;
 }

/**
 * Loads the game state from the given state object.
 * @param  {State} state The state to load.
 */
 function loadState(state) {
 	grid = clone(state.grid);
 	currentShape = clone(state.currentShape);
 	upcomingShape = clone(state.upcomingShape);
 	bag = clone(state.bag);
 	bagIndex = clone(state.bagIndex);
 	rndSeed = clone(state.rndSeed);
 	score = clone(state.score);
 	output();
 	updateScore();
 }

/**
 * Returns the cumulative height of all the columns.
 * @return {Number} The cumulative height.
 */
 function getCumulativeHeight() {
 	removeShape();
 	var peaks = [20,20,20,20,20,20,20,20,20,20];
 	for (var row = 0; row < grid.length; row++) {
 		for (var col = 0; col < grid[row].length; col++) {
 			if (grid[row][col] !== 0 && peaks[col] === 20) {
 				peaks[col] = row;
 			}
 		}
 	}
 	var totalHeight = 0;
 	for (var i = 0; i < peaks.length; i++) {
 		totalHeight += 20 - peaks[i];
 	}
 	applyShape();
 	return totalHeight;
 }

/**
 * Returns the number of holes in the grid.
 * @return {Number} The number of holes.
 */
 function getHoles() {
 	removeShape();
 	var peaks = [20,20,20,20,20,20,20,20,20,20];
 	for (var row = 0; row < grid.length; row++) {
 		for (var col = 0; col < grid[row].length; col++) {
 			if (grid[row][col] !== 0 && peaks[col] === 20) {
 				peaks[col] = row;
 			}
 		}
 	}
 	var holes = 0;
 	for (var x = 0; x < peaks.length; x++) {
 		for (var y = peaks[x]; y < grid.length; y++) {
 			if (grid[y][x] === 0) {
 				holes++;
 			}
 		}
 	}
 	applyShape();
 	return holes;
 }

/**
 * Returns an array that replaces all the holes in the grid with -1.
 * @return {Array} The modified grid array.
 */
 function getHolesArray() {
 	var array = clone(grid);
 	removeShape();
 	var peaks = [20,20,20,20,20,20,20,20,20,20];
 	for (var row = 0; row < grid.length; row++) {
 		for (var col = 0; col < grid[row].length; col++) {
 			if (grid[row][col] !== 0 && peaks[col] === 20) {
 				peaks[col] = row;
 			}
 		}
 	}
 	for (var x = 0; x < peaks.length; x++) {
 		for (var y = peaks[x]; y < grid.length; y++) {
 			if (grid[y][x] === 0) {
 				array[y][x] = -1;
 			}
 		}
 	}
 	applyShape();
 	return array;
 }

/**
 * Returns the roughness of the grid.
 * @return {Number} The roughness of the grid.
 */
 function getRoughness() {
 	removeShape();
 	var peaks = [20,20,20,20,20,20,20,20,20,20];
 	for (var row = 0; row < grid.length; row++) {
 		for (var col = 0; col < grid[row].length; col++) {
 			if (grid[row][col] !== 0 && peaks[col] === 20) {
 				peaks[col] = row;
 			}
 		}
 	}
 	var roughness = 0;
 	var differences = [];
 	for (var i = 0; i < peaks.length - 1; i++) {
 		roughness += Math.abs(peaks[i] - peaks[i + 1]);
 		differences[i] = Math.abs(peaks[i] - peaks[i + 1]);
 	}
 	applyShape();
 	return roughness;
 }

/**
 * Returns the range of heights of the columns on the grid.
 * @return {Number} The relative height.
 */
 function getRelativeHeight() {
 	removeShape();
 	var peaks = [20,20,20,20,20,20,20,20,20,20];
 	for (var row = 0; row < grid.length; row++) {
 		for (var col = 0; col < grid[row].length; col++) {
 			if (grid[row][col] !== 0 && peaks[col] === 20) {
 				peaks[col] = row;
 			}
 		}
 	}
 	applyShape();
 	return Math.max.apply(Math, peaks) - Math.min.apply(Math, peaks);
 }

/**
 * Returns the height of the biggest column on the grid.
 * @return {Number} The absolute height.
 */
 function getHeight() {
 	removeShape();
 	var peaks = [20,20,20,20,20,20,20,20,20,20];
 	for (var row = 0; row < grid.length; row++) {
 		for (var col = 0; col < grid[row].length; col++) {
 			if (grid[row][col] !== 0 && peaks[col] === 20) {
 				peaks[col] = row;
 			}
 		}
 	}
 	applyShape();
 	return 20 - Math.min.apply(Math, peaks);
 }

/**
 * Loads the archive given.
 * @param  {String} archiveString The stringified archive.
 */
 function loadArchive(archiveString) {
 	archive = JSON.parse(archiveString);
 	genomes = clone(archive.genomes);
 	populationSize = archive.populationSize;
 	generation = archive.currentGeneration;
 	currentGenome = 0;
 	reset();
 	roundState = getState();
 	console.log("Archive loaded!");
 }

/**
 * Clones an object.
 * @param  {Object} obj The object to clone.
 * @return {Object}     The cloned object.
 */
 function clone(obj) {
 	return JSON.parse(JSON.stringify(obj));
 }

/**
 * Returns a random property from the given object.
 * @param  {Object} obj The object to select a property from.
 * @return {Property}     A random property.
 */
 function randomProperty(obj) {
 	return(obj[randomKey(obj)]);
 }

/**
 * Returns a random property key from the given object.
 * @param  {Object} obj The object to select a property key from.
 * @return {Property}     A random property key.
 */
 function randomKey(obj) {
 	var keys = Object.keys(obj);
 	var i = seededRandom(0, keys.length);
 	return keys[i];
 }

 function replaceAll(target, search, replacement) {
 	return target.replace(new RegExp(search, 'g'), replacement);
 }

/**
 * Returns a random number that is determined from a seeded random number generator.
 * @param  {Number} min The minimum number, inclusive.
 * @param  {Number} max The maximum number, exclusive.
 * @return {Number}     The generated random number.
 */
 function seededRandom(min, max) {
 	max = max || 1;
 	min = min || 0;

 	rndSeed = (rndSeed * 9301 + 49297) % 233280;
 	var rnd = rndSeed / 233280;

 	return Math.floor(min + rnd * (max - min));
 }

 function randomNumBetween(min, max) {
 	return Math.floor(Math.random() * (max - min + 1) + min);
 }

 function randomWeightedNumBetween(min, max) {
 	return Math.floor(Math.pow(Math.random(), 2) * (max - min + 1) + min);
 }

 function randomChoice(propOne, propTwo) {
 	if (Math.round(Math.random()) === 0) {
 		return clone(propOne);
 	} else {
 		return clone(propTwo);
 	}
 }

 function contains(a, obj) {
 	var i = a.length;
 	while (i--) {
 		if (a[i] === obj) {
 			return true;
 		}
 	}
 	return false;
 }

/**
 * A node, representing a biological neuron.
 * @param {Number} ID  The ID of the node.
 * @param {Number} val The value of the node.
 */
 function Node(ID, val) {
 	this.id = ID;
 	this.incomingConnections = [];
 	this.outgoingConnections = [];
 	if (val === undefined) {
 		val = 0;
 	}
 	this.value = val;
 	this.bias = 0;
 }

/**
 * A connection, representing a biological synapse.
 * @param {String} inID   The ID of the incoming node.
 * @param {String} outID  The ID of the outgoing node.
 * @param {Number} weight The weight of the connection.
 */
 function Connection(inID, outID, weight) {
 	this.in = inID;
 	this.out = outID;
 	if (weight === undefined) {
 		weight = 1;
 	}
 	this.id = inID + ":" + outID;
 	this.weight = weight;
 }

/**
 * The neural network, containing nodes and connections.
 * @param {Object} config The configuration to use.
 */
 function Network(config) {
 	this.nodes = {};
 	this.inputs = [];
 	this.hidden = [];
 	this.outputs = [];
 	this.connections = {};
 	this.nodes.BIAS = new Node("BIAS", 1);

 	if (config !== undefined) {
 		var inputNum = config.inputNodes || 0;
 		var hiddenNum = config.hiddenNodes || 0;
 		var outputNum = config.outputNodes || 0;
 		this.createNodes(inputNum, hiddenNum, outputNum);

 		if (config.createAllConnections) {
 			this.createAllConnections(true);
 		}
 	}
 }

/**
 * Populates the network with the given number of nodes of each type.
 * @param  {Number} inputNum The number of input nodes to create.
 * @param  {Number} hiddenNum The number of hidden nodes to create.
 * @param  {Number} outputNum The number of output nodes to create.
 */
 Network.prototype.createNodes = function(inputNum, hiddenNum, outputNum) {
 	for (var i = 0; i < inputNum; i++) {
 		this.addInput();
 	}
 	for (var j = 0; j < hiddenNum; j++) {
 		this.addHidden();
 	}
 	for (var k = 0; k < outputNum; k++) {
 		this.addOutput();
 	}
 };

/**
 * @param {Number} [value] The value to set the node to [Default is 0].
 */
 Network.prototype.addInput = function(value) {
 	var nodeID = "INPUT:" + this.inputs.length;
 	if (value === undefined) {
 		value = 0;
 	}
 	this.nodes[nodeID] = new Node(nodeID, value);
 	this.inputs.push(nodeID);
 };

/**
 * Creates a hidden node.
 */
 Network.prototype.addHidden = function() {
 	var nodeID = "HIDDEN:" + this.hidden.length;
 	this.nodes[nodeID] = new Node(nodeID);
 	this.hidden.push(nodeID);
 };

/**
 * Creates an output node.
 */
 Network.prototype.addOutput = function() {
 	var nodeID = "OUTPUT:" + this.outputs.length;
 	this.nodes[nodeID] = new Node(nodeID);
 	this.outputs.push(nodeID);
 };

/**
 * Returns the node with the given ID.
 * @param  {String} nodeID The ID of the node to return.
 * @return {Node} The node with the given ID.
 */
 Network.prototype.getNodeByID = function(nodeID) {
 	return this.nodes[nodeID];
 };

/**
 * Returns the node of the given type at the given index.
 * @param  {String} type  The type of node requested [Accepted arguments: "INPUT", "HIDDEN", "OUTPUT"].
 * @param  {Number} index The index of the node (from the array containing nodes of the requested type).
 * @return {Node} The node requested. Will return null if no node is found.
 */
 Network.prototype.getNode = function(type, index) {
 	if (type.toUpperCase() == "INPUT") {
 		return this.nodes[this.inputs[index]];
 	} else 	if (type.toUpperCase() == "HIDDEN") {
 		return this.nodes[this.hidden[index]];
 	} else 	if (type.toUpperCase() == "OUTPUT") {
 		return this.nodes[this.outputs[index]];
 	}
 	return null;
 };

/**
 * Returns the connection with the given ID.
 * @param  {String} connectionID The ID of the connection to return.
 * @return {Connection} The connection with the given ID.
 */
 Network.prototype.getConnection = function(connectionID) {
 	return this.connections[connectionID];
 };

/**
 * Calculates the values of the nodes in the neural network.
 */
 Network.prototype.calculate = function calculate() {
 	this.updateNodeConnections();
 	for (var i = 0; i < this.hidden.length; i++) {
 		this.calculateNodeValue(this.hidden[i]);
 	}
 	for (var j = 0; j < this.outputs.length; j++) {
 		this.calculateNodeValue(this.outputs[j]);
 	}
 };

/**
 * Updates the node's to reference the current connections.
 */
 Network.prototype.updateNodeConnections = function() {
 	for (var nodeKey in this.nodes) {
 		this.nodes[nodeKey].incomingConnections = [];
 		this.nodes[nodeKey].outgoingConnections = [];
 	}
 	for (var connectionKey in this.connections) {
 		this.nodes[this.connections[connectionKey].in].outgoingConnections.push(connectionKey);
 		this.nodes[this.connections[connectionKey].out].incomingConnections.push(connectionKey);
 	}
 };

/**
 * Calculates and updates the value of the node with the given ID. Node values are computed using a sigmoid function.
 * @param  {String} nodeId The ID of the node to update.
 */
 Network.prototype.calculateNodeValue = function(nodeID) {
 	var sum = 0;
 	for (var incomingIndex = 0; incomingIndex < this.nodes[nodeID].incomingConnections.length; incomingIndex++) {
 		var connection = this.connections[this.nodes[nodeID].incomingConnections[incomingIndex]];
 		sum += this.nodes[connection.in].value * connection.weight;
 	}
 	this.nodes[nodeID].value = sigmoid(sum);
 };

/**
 * Creates a connection with the given values.
 * @param {String} inID The ID of the node that the connection comes from. 
 * @param {String} outID The ID of the node that the connection enters.
 * @param {Number} [weight] The weight of the connection [Default is 1].
 */
 Network.prototype.addConnection = function(inID, outID, weight) {
 	if (weight === undefined) {
 		weight = 1;
 	}
 	this.connections[inID + ":" + outID] = new Connection(inID, outID, weight);
 };

 /**
 * Creates all possible connections between nodes, not including connections to the bias node.
 * @param  {Boolean} randomWeights Whether to choose a random weight between -1 and 1, or to default to 1.
 */
 Network.prototype.createAllConnections = function(randomWeights) {
 	if (randomWeights === undefined) {
 		randomWeights = false;
 	}
 	var weight = 1;
 	for (var i = 0; i < this.inputs.length; i++) {
 		for (var j = 0; j < this.hidden.length; j++) {
 			if (randomWeights) {
 				weight = Math.random() * 4 - 2;
 			}
 			this.addConnection(this.inputs[i], this.hidden[j], weight);
 		}
 		if (randomWeights) {
 			weight = Math.random() * 4 - 2;
 		}
 		this.addConnection("BIAS", this.inputs[i], weight);
 	}
 	for (var k = 0; k < this.hidden.length; k++) {
 		for (var l = 0; l < this.outputs.length; l++) {
 			if (randomWeights) {
 				weight = Math.random() * 4 - 2;
 			}
 			this.addConnection(this.hidden[k], this.outputs[l], weight);
 		}
 		if (randomWeights) {
 			weight = Math.random() * 4 - 2;
 		}
 		this.addConnection("BIAS", this.hidden[k], weight);
 	}
 };

/**
 * Sets the value of the node with the given ID to the given value.
 * @param {String} nodeID The ID of the node to modify.
 * @param {Number} value The value to set the node to.
 */
 Network.prototype.setNodeValue = function(nodeID, value) {
 	this.nodes[nodeID].value = value;
 };

/**
 * Sets the values of the input neurons to the given values.
 * @param {Array} array An array of values to set the input node values to.
 */
 Network.prototype.setInputs = function(array) {
 	for (var i = 0; i < array.length; i++) {
 		this.nodes[this.inputs[i]].value = array[i];
 	}
 };

/**
 * Sets the value of multiple nodes, given an object with node ID's as parameters and node values as values.
 * @param {Object} valuesByID The values to set the nodes to.
 */
 Network.prototype.setMultipleNodeValues = function(valuesByID) {
 	for (var key in valuesByID) {
 		this.nodes[key].value = valuesByID[key];
 	}
 };


/**
 * A visualization of the neural network, showing all connections and nodes.
 * @param {Object} config The configuration to use.
 */
 function NetworkVisualizer(config) {
 	this.canvas = "NetworkVisualizer";
 	this.backgroundColor = "#FFFFFF";
 	this.nodeRadius = -1;
 	this.nodeColor = "grey";
 	this.positiveConnectionColor = "green";
 	this.negativeConnectionColor = "red";
 	this.connectionStrokeModifier = 1;
 	if (config !== undefined) {
 		if (config.canvas !== undefined) {
 			this.canvas = config.canvas;
 		}
 		if (config.backgroundColor !== undefined) {
 			this.backgroundColor = config.backgroundColor;
 		}
 		if (config.nodeRadius !== undefined) {
 			this.nodeRadius = config.nodeRadius;
 		}
 		if (config.nodeColor !== undefined) {
 			this.nodeColor = config.nodeColor;
 		}
 		if (config.positiveConnectionColor !== undefined) {
 			this.positiveConnectionColor = config.positiveConnectionColor;
 		}
 		if (config.negativeConnectionColor !== undefined) {
 			this.negativeConnectionColor = config.negativeConnectionColor;
 		}
 		if (config.connectionStrokeModifier !== undefined) {
 			this.connectionStrokeModifier = config.connectionStrokeModifier;
 		}
 	}
 }

/**
 * Draws the visualized network upon the canvas.
 * @param  {Network} network The network to visualize.
 */
 NetworkVisualizer.prototype.drawNetwork = function(network) {
 	var canv = document.getElementById(this.canvas); 
 	var ctx = canv.getContext("2d");
 	var radius;
 	ctx.fillStyle = this.backgroundColor;
 	ctx.fillRect(0, 0, canv.width, canv.height);
 	if (this.nodeRadius != -1) {
 		radius = this.nodeRadius;
 	} else {
 		radius = Math.min(canv.width, canv.height) / (Math.max(network.inputs.length, network.hidden.length, network.outputs.length, 3)) / 2.5;
 	}
 	var nodeLocations = {};
 	var inputX = canv.width / 5;
 	for (var inputIndex = 0; inputIndex < network.inputs.length; inputIndex++) {
 		nodeLocations[network.inputs[inputIndex]] = {x: inputX, y: canv.height / (network.inputs.length) * (inputIndex + 0.5)};
 	}
 	var hiddenX = canv.width / 2;
 	for (var hiddenIndex = 0; hiddenIndex < network.hidden.length; hiddenIndex++) {
 		nodeLocations[network.hidden[hiddenIndex]] = {x: hiddenX, y: canv.height / (network.hidden.length) * (hiddenIndex + 0.5)};
 	}
 	var outputX = canv.width / 5 * 4;
 	for (var outputIndex = 0; outputIndex < network.outputs.length; outputIndex++) {
 		nodeLocations[network.outputs[outputIndex]] = {x: outputX, y: canv.height / (network.outputs.length) * (outputIndex + 0.5)};
 	}
 	nodeLocations.BIAS = {x: canv.width / 3, y: radius / 2};
 	for (var connectionKey in network.connections) {
 		var connection = network.connections[connectionKey];
 		//if (connection.in != "BIAS" && connection.out != "BIAS") {
 			ctx.beginPath();
 			ctx.moveTo(nodeLocations[connection.in].x, nodeLocations[connection.in].y);
 			ctx.lineTo(nodeLocations[connection.out].x, nodeLocations[connection.out].y);
 			if (connection.weight > 0) {
 				ctx.strokeStyle = this.positiveConnectionColor;
 			} else {
 				ctx.strokeStyle = this.negativeConnectionColor;
 			}
 			ctx.lineWidth = connection.weight * this.connectionStrokeModifier;
 			ctx.lineCap = "round";
 			ctx.stroke();
 		//}
 	}
 	for (var nodeKey in nodeLocations) {
 		var node = network.getNodeByID(nodeKey);
 		ctx.beginPath();
 		if (nodeKey == "BIAS") {
 			ctx.arc(nodeLocations[nodeKey].x, nodeLocations[nodeKey].y, radius / 2.2, 0, 2 * Math.PI);
 		} else {
 			ctx.arc(nodeLocations[nodeKey].x, nodeLocations[nodeKey].y, radius, 0, 2 * Math.PI);
 		}
 		ctx.fillStyle = this.backgroundColor;
 		ctx.fill();
 		ctx.strokeStyle = this.nodeColor;
 		ctx.lineWidth = 3;
 		ctx.stroke();
 		ctx.globalAlpha = node.value;
 		ctx.fillStyle = this.nodeColor;
 		ctx.fill();
 		ctx.globalAlpha = 1; 	
 	}
 };


 BackpropNetwork.prototype = new Network();
 BackpropNetwork.prototype.constructor = BackpropNetwork;

/**
 * Neural network that is optimized via backpropagation.
 * @param {Object} config The configuration to use.
 */
 function BackpropNetwork(config) {
 	Network.call(this, config);
 	this.inputData = {};
 	this.targetData = {};
 	this.learningRate = 0.5;
 	this.step = 0;
 	this.totalErrorSum = 0;
 	this.averageError = [];

 	if (config !== undefined) {
 		if (config.learningRate !== undefined) {
 			this.learningRate = config.learningRate;
 		}
 		if (config.inputData !== undefined) {
 			this.setInputData(config.inputData);
 		}
 		if (config.targetData !== undefined) {
 			this.setTargetData(config.targetData);
 		}
 	}
 }

/**
 * Backpropagates the neural network, using the input and training data given. Currently does not affect connections to the bias node.
 */
 BackpropNetwork.prototype.backpropagate = function() {
 	this.step++;
 	if (this.inputData[this.step] === undefined) {
 		this.averageError.push(this.totalErrorSum / this.step);
 		this.totalErrorSum = 0;
 		this.step = 0;
 	}
 	for (var inputKey in this.inputData[this.step]) {
 		this.nodes[inputKey].value = this.inputData[this.step][inputKey];
 	}
 	this.calculate();
 	var currentTargetData = this.targetData[this.step];
 	var totalError = this.getTotalError();
 	this.totalErrorSum += totalError;
 	var newWeights = {};
 	for (var i = 0; i < this.outputs.length; i++) {
 		var outputNode = this.nodes[this.outputs[i]];
 		for (var j = 0; j < outputNode.incomingConnections.length; j++) {
 			var hiddenToOutput = this.connections[outputNode.incomingConnections[j]];
 			var deltaRuleResult = -(currentTargetData[this.outputs[i]] - outputNode.value) * outputNode.value * (1 - outputNode.value) * this.nodes[hiddenToOutput.in].value;
 			newWeights[hiddenToOutput.id] = hiddenToOutput.weight - this.learningRate * deltaRuleResult;
 		}
 	}
 	for (var k = 0; k < this.hidden.length; k++) {
 		var hiddenNode = this.nodes[this.hidden[k]];
 		for (var l = 0; l < hiddenNode.incomingConnections.length; l++) {
 			var inputToHidden = this.connections[hiddenNode.incomingConnections[l]];
 			var total = 0;
 			for (var m = 0; m < hiddenNode.outgoingConnections.length; m++) {
 				var outgoing = this.connections[hiddenNode.outgoingConnections[m]];
 				var outgoingNode = this.nodes[outgoing.out];
 				total += ((-(currentTargetData[outgoing.out] - outgoingNode.value)) * (outgoingNode.value * (1 - outgoingNode.value))) * outgoing.weight;
 			}
 			var outOverNet = hiddenNode.value * (1 - hiddenNode.value);
 			var netOverWeight = this.nodes[inputToHidden.in].value;
 			var result = total * outOverNet * netOverWeight;
 			newWeights[inputToHidden.id] = inputToHidden.weight - this.learningRate * result;
 		}
 	}
 	for (var key in newWeights) {
 		this.connections[key].weight = newWeights[key];
 	}
 };

/**
 * Adds a target result to the target data. This will be compared to the output in order to determine error.
 * @param {String} outputNodeID The ID of the output node whose value will be compared to the target.
 * @param {Number} target The value to compare against the output when checking for errors.
 */
 BackpropNetwork.prototype.addTarget = function(outputNodeID, target) {
 	this.targetData[outputNodeID] = target;
 };

/**
 * Sets the input data that will be compared to the target data.
 * @param {Array} array An array containing the data to be inputted (ex. [0, 1] will set the first input node
 * to have a value of 0 and the second to have a value of 1). Each array argument represents a single
 * step, and will be compared against the parallel set in the target data.
 */
 BackpropNetwork.prototype.setInputData = function() {
 	var all = arguments;
 	if (arguments.length == 1 && arguments[0].constructor == Array) {
 		all = arguments[0];
 	} 
 	this.inputData = {};
 	for (var i = 0; i < all.length; i++) {
 		var data = all[i];
 		var instance = {};
 		for (var j = 0; j < data.length; j++) {
 			instance["INPUT:" + j] = data[j]; 
 		}
 		this.inputData[i] = instance;
 	}
 };

/**
 * Sets the target data that will be used to check for total error.
 * @param {Array} array An array containing the data to be compared against (ex. [0, 1] will compare the first
 * output node against 0 and the second against 1). Each array argument represents a single step.
 */
 BackpropNetwork.prototype.setTargetData = function() {
 	var all = arguments;
 	if (arguments.length == 1 && arguments[0].constructor == Array) {
 		all = arguments[0];
 	} 
 	this.targetData = {};
 	for (var i = 0; i < all.length; i++) {
 		var data = all[i];
 		var instance = {};
 		for (var j = 0; j < data.length; j++) {
 			instance["OUTPUT:" + j] = data[j]; 
 		}
 		this.targetData[i] = instance;
 	}
 };

/**
 * Calculates the total error of all the outputs' values compared to the target data.
 * @return {Number} The total error.
 */
 BackpropNetwork.prototype.getTotalError = function() {
 	var sum = 0;
 	for (var i = 0; i < this.outputs.length; i++) {
 		sum += Math.pow(this.targetData[this.step][this.outputs[i]] - this.nodes[this.outputs[i]].value, 2) / 2;
 	}
 	return sum;
 };

/**
 * A gene containing the data for a single connection in the neural network.
 * @param {String} inID       The ID of the incoming node.
 * @param {String} outID      The ID of the outgoing node.
 * @param {Number} weight     The weight of the connection to create.
 * @param {Number} innovation The innovation number of the gene.
 * @param {Boolean} enabled   Whether the gene is expressed or not.
 */	
 function Gene(inID, outID, weight, innovation, enabled) {
 	if (innovation === undefined) {
 		innovation = 0;
 	}
 	this.innovation = innovation;
 	this.in = inID;
 	this.out = outID;
 	if (weight === undefined) {
 		weight = 1;
 	}
 	this.weight = weight;
 	if (enabled === undefined) {
 		enabled = true;
 	}
 	this.enabled = enabled;
 }

/**
 * Returns the connection that the gene represents.
 * @return {Connection} The generated connection.
 */
 Gene.prototype.getConnection = function() {
 	return new Connection(this.in, this.out, this.weight);
 };

/**
 * A genome containing genes that will make up the neural network.
 * @param {Number} inputNodes  The number of input nodes to create.
 * @param {Number} outputNodes The number of output nodes to create.
 */
 function Genome(inputNodes, outputNodes) {
 	this.inputNodes = inputNodes;
 	this.outputNodes = outputNodes;
 	this.genes = [];
 	this.fitness = -Number.MAX_VALUE;
 	this.globalRank = 0;
 	this.randomIdentifier = Math.random();
 }

 Genome.prototype.containsGene = function(inID, outID) {
 	for (var i = 0; i < this.genes.length; i++) {
 		if (this.genes[i].inID == inID && this.genes[i].outID == outID) {
 			return true;
 		}
 	}
 	return false;
 };

/**
 * A species of genomes that contains genomes which closely resemble one another, enough so that they are able to breed.
 */
 function Species() {
 	this.genomes = [];
 	this.averageFitness = 0;
 }

/**
 * Culls the genomes to the given amount by removing less fit genomes.
 * @param  {Number} [remaining] The number of genomes to cull to [Default is half the size of the species (rounded up)].
 */
 Species.prototype.cull = function(remaining) {
 	this.genomes.sort(compareGenomesDescending);
 	if (remaining === undefined) {
 		remaining = Math.ceil(this.genomes.length / 2);
 	}
 	while (this.genomes.length > remaining) {
 		this.genomes.pop();
 	}
 };

/**
 * Calculates the average fitness of the species.
 */
 Species.prototype.calculateAverageFitness = function() {
 	var sum = 0;
 	for (var j = 0; j < this.genomes.length; j++) {
 		sum += this.genomes[j].fitness;
 	}
 	this.averageFitness = sum / this.genomes.length;
 };

/**
 * Returns the network that the genome represents.
 * @return {Network} The generated network.
 */
 Genome.prototype.getNetwork = function() {
 	var network = new Network();
 	network.createNodes(this.inputNodes, 0, this.outputNodes);
 	for (var i = 0; i < this.genes.length; i++) {
 		var gene = this.genes[i];
 		if (gene.enabled) {
 			if (network.nodes[gene.in] === undefined && gene.in.indexOf("HIDDEN") != -1) {
 				network.nodes[gene.in] = new Node(gene.in);
 				network.hidden.push(gene.in);
 			}
 			if (network.nodes[gene.out] === undefined && gene.out.indexOf("HIDDEN") != -1) {
 				network.nodes[gene.out] = new Node(gene.out);
 				network.hidden.push(gene.out);
 			}
 			network.addConnection(gene.in, gene.out, gene.weight);
 		}
 	}
 	return network;
 };

/**
 * Creates and optimizes neural networks via neuroevolution, using the Neuroevolution of Augmenting Topologies method.
 * @param {Object} config The configuration to use.
 */
 function Neuroevolution(config) {
 	this.genomes = [];
 	this.populationSize = 100;
 	this.mutationRates = {
 		createConnection: 0.05,
 		createNode: 0.02,
 		modifyWeight: 0.15,
 		enableGene: 0.05,
 		disableGene: 0.1,
 		createBias: 0.1,
 		weightMutationStep: 2
 	};
 	this.inputNodes = 0;
 	this.outputNodes = 0;
 	this.elitism = true;
 	this.deltaDisjoint = 2;
 	this.deltaWeights = 0.4;
 	this.deltaThreshold = 2;
 	this.hiddenNodeCap = 10;
 	this.fitnessFunction = function (network) {log("ERROR: Fitness function not set"); return -1;};
 	this.globalInnovationCounter = 1;
 	this.currentGeneration = 0;
 	this.species = [];
 	this.newInnovations = {};
 	if (config !== undefined) {
 		if (config.populationSize !== undefined) {
 			this.populationSize = config.populationSize;
 		}
 		if (config.inputNodes !== undefined) {
 			this.inputNodes = config.inputNodes;
 		}
 		if (config.outputNodes !== undefined) {
 			this.outputNodes = config.outputNodes;
 		}
 		if (config.mutationRates !== undefined) {
 			var configRates = config.mutationRates;
 			if (configRates.createConnection !== undefined) {
 				this.mutationRates.createConnection = configRates.createConnection;
 			}
 			if (configRates.createNode !== undefined) {
 				this.mutationRates.createNode = configRates.createNode;
 			}
 			if (configRates.modifyWeight !== undefined) {
 				this.mutationRates.modifyWeight = configRates.modifyWeight;
 			}
 			if (configRates.enableGene !== undefined) {
 				this.mutationRates.enableGene = configRates.enableGene;
 			}
 			if (configRates.disableGene !== undefined) {
 				this.mutationRates.disableGene = configRates.disableGene;
 			}
 			if (configRates.createBias !== undefined) {
 				this.mutationRates.createBias = configRates.createBias;
 			}
 			if (configRates.weightMutationStep !== undefined) {
 				this.mutationRates.weightMutationStep = configRates.weightMutationStep;
 			}
 		}
 		if (config.elitism !== undefined) {
 			this.elitism = config.elitism;
 		}
 		if (config.deltaDisjoint !== undefined) {
 			this.deltaDisjoint = config.deltaDisjoint;
 		}
 		if (config.deltaWeights !== undefined) {
 			this.deltaWeights = config.deltaWeights;
 		}
 		if (config.deltaThreshold !== undefined) {
 			this.deltaThreshold = config.deltaThreshold;
 		}
 		if (config.hiddenNodeCap !== undefined) {
 			this.hiddenNodeCap = config.hiddenNodeCap;
 		}
 	}
 }

/**
 * Populates the population with empty genomes, and then mutates the genomes.
 */
 Neuroevolution.prototype.createInitialPopulation = function() {
 	this.genomes = [];
 	for (var i = 0; i < this.populationSize; i++) {
 		var genome = this.linkMutate(new Genome(this.inputNodes, this.outputNodes));
 		this.genomes.push(genome);
 	}
 	this.mutate();
 };

/**
 * Mutates the entire population based on the mutation rates.
 */
 Neuroevolution.prototype.mutate = function() {
 	for (var i = 0; i < this.genomes.length; i++) {
 		var network = this.genomes[i].getNetwork();
 		if (Math.random() < this.mutationRates.createConnection) {
 			this.genomes[i] = this.linkMutate(this.genomes[i]);
 		}
 		if (Math.random() < this.mutationRates.createNode && this.genomes[i].genes.length > 0 && network.hidden.length < this.hiddenNodeCap) {
 			var geneIndex = randomNumBetween(0, this.genomes[i].genes.length - 1);
 			var gene = this.genomes[i].genes[geneIndex];
 			if (gene.enabled && gene.in.indexOf("INPUT") != -1 && gene.out.indexOf("OUTPUT") != -1) {
 				var newNum = -1;
 				var found = true;
 				while (found) {
 					newNum++;
 					found = false;
 					for (var j = 0; j < this.genomes[i].genes.length; j++) {
 						if (this.genomes[i].genes[j].in.indexOf("HIDDEN:" + newNum) != -1 || this.genomes[i].genes[j].out.indexOf("HIDDEN:" + newNum) != -1) {
 							found = true;
 						}
 					}
 				}
 				if (newNum < this.hiddenNodeCap) {
 					var nodeName = "HIDDEN:" + newNum;
 					this.genomes[i].genes[geneIndex].enabled = false;
 					this.genomes[i].genes.push(new Gene(gene.in, nodeName, 1, this.globalInnovationCounter));
 					this.globalInnovationCounter++;
 					this.genomes[i].genes.push(new Gene(nodeName, gene.out, gene.weight, this.globalInnovationCounter));
 					this.globalInnovationCounter++;
 					network = this.genomes[i].getNetwork();
 				}
 			}
 		}
 		if (Math.random() < this.mutationRates.createBias) {
 			if (Math.random() > 0.5 && network.inputs.length > 0) {
 				var inputIndex = randomNumBetween(0, network.inputs.length - 1);
 				if (network.getConnection("BIAS:" + network.inputs[inputIndex]) === undefined) {
 					this.genomes[i].genes.push(new Gene("BIAS", network.inputs[inputIndex]));
 				}
 			} else if (network.hidden.length > 0) {
 				var hiddenIndex = randomNumBetween(0, network.hidden.length - 1);
 				if (network.getConnection("BIAS:" + network.hidden[hiddenIndex]) === undefined) {
 					this.genomes[i].genes.push(new Gene("BIAS", network.hidden[hiddenIndex]));
 				}
 			}
 		}
 		for (var k = 0; k < this.genomes[i].genes.length; k++) {
 			this.genomes[i].genes[k] = this.pointMutate(this.genomes[i].genes[k]);
 		}

 	}
 };

/**
 * Attempts to create a new connection gene in the given genome.
 * @param  {Genome} genome The genome to mutate.
 * @return {Genome} The mutated genome.
 */
 Neuroevolution.prototype.linkMutate = function(genome) {
 	var network = genome.getNetwork();
 	var inNode = "";
 	var outNode = "";
 	if (Math.random() < 1/3 || network.hidden.length <= 0) {
 		inNode = network.inputs[randomNumBetween(0, this.inputNodes - 1)];
 		outNode = network.outputs[randomNumBetween(0, this.outputNodes - 1)];
 	} else if (Math.random() < 2/3) {
 		inNode = network.inputs[randomNumBetween(0, this.inputNodes - 1)];
 		outNode = network.hidden[randomNumBetween(0, network.hidden.length - 1)];
 	} else {
 		inNode = network.hidden[randomNumBetween(0, network.hidden.length - 1)];
 		outNode = network.outputs[randomNumBetween(0, this.outputNodes - 1)];
 	}
 	if (!genome.containsGene(inNode, outNode)) {
 		var newGene = new Gene(inNode, outNode, Math.random() * 2 - 1);
 		if (this.newInnovations[newGene.in + ":" + newGene.out] === undefined) {
 			this.newInnovations[newGene.in + ":" + newGene.out] = this.globalInnovationCounter;
 			newGene.innovation = this.globalInnovationCounter;
 			this.globalInnovationCounter++;
 		} else {
 			newGene.innovation = this.newInnovations[newGene.in + ":" + newGene.out];
 		}
 		genome.genes.push(newGene);
 	}
 	return genome;
 };

 /**
 * Mutates the given gene based on the mutation rates.
 * @param  {Gene} gene The gene to mutate.
 * @return {Gene} The mutated gene.
 */
 Neuroevolution.prototype.pointMutate = function(gene) {
 	if (Math.random() < this.mutationRates.modifyWeight) {
 		gene.weight = gene.weight + Math.random() * this.mutationRates.weightMutationStep * 2 - this.mutationRates.weightMutationStep; 
 	}
 	if (Math.random() < this.mutationRates.enableGene) {
 		gene.enabled = true;
 	}
 	if (Math.random() < this.mutationRates.disableGene) {
 		gene.enabled = false;
 	}
 	return gene;
 };

/**
 * Crosses two parent genomes with one another, forming a child genome.
 * @param  {Genome} firstGenome  The first genome to mate.
 * @param  {Genome} secondGenome The second genome to mate.
 * @return {Genome} The resultant child genome.
 */
 Neuroevolution.prototype.crossover = function(firstGenome, secondGenome) {
 	var child = new Genome(firstGenome.inputNodes, firstGenome.outputNodes);
 	var firstInnovationNumbers = {};
 	for (var h = 0; h < firstGenome.genes.length; h++) {
 		firstInnovationNumbers[firstGenome.genes[h].innovation] = h;
 	}
 	var secondInnovationNumbers = {};
 	for (var j = 0; j < secondGenome.genes.length; j++) {
 		secondInnovationNumbers[secondGenome.genes[j].innovation] = j;
 	}
 	for (var i = 0; i < firstGenome.genes.length; i++) {
 		var geneToClone;
 		if (secondInnovationNumbers[firstGenome.genes[i].innovation] !== undefined) {
 			if (Math.random() < 0.5) {
 				geneToClone = firstGenome.genes[i];
 			} else {
 				geneToClone = secondGenome.genes[secondInnovationNumbers[firstGenome.genes[i].innovation]];
 			}
 		} else {
 			geneToClone = firstGenome.genes[i];
 		}
 		child.genes.push(new Gene(geneToClone.in, geneToClone.out, geneToClone.weight, geneToClone.innovation, geneToClone.enabled)); 		
 	}
 	for (var k = 0; k < secondGenome.genes.length; k++) {
 		if (firstInnovationNumbers[secondGenome.genes[k].innovation] === undefined) {
 			var secondDisjoint = secondGenome.genes[k];
 			child.genes.push(new Gene(secondDisjoint.in, secondDisjoint.out, secondDisjoint.weight, secondDisjoint.innovation, secondDisjoint.enabled)); 		
 		}
 	}
 	return child;
 };

/**
 * Evolves the population by creating a new generation and mutating the children.
 */
 Neuroevolution.prototype.evolve = function() {
 	this.currentGeneration++;
 	this.newInnovations = {};
 	this.genomes.sort(compareGenomesDescending);
 	var children = [];
 	this.speciate();
 	this.cullSpecies();
 	this.calculateSpeciesAvgFitness();

 	var totalAvgFitness = 0;
 	var avgFitnesses = [];
 	for (var s = 0; s < this.species.length; s++) {
 		totalAvgFitness += this.species[s].averageFitness;
 		avgFitnesses.push(this.species[s].averageFitness);
 	}
 	var arr = [];
 	for (var j = 0; j < this.species.length; j++) {
 		var childrenToMake = Math.floor(this.species[j].averageFitness / totalAvgFitness * this.populationSize);
 		arr.push(childrenToMake);
 		if (childrenToMake > 0) {
 			children.push(this.species[j].genomes[0]);
 		}
 		for (var c = 0; c < childrenToMake - 1; c++) {
 			children.push(this.makeBaby(this.species[j]));
 		}
 	}
 	while (children.length < this.populationSize) {
 		children.push(this.makeBaby(this.species[randomNumBetween(0, this.species.length - 1)]));
 	}
 	this.genomes = [];
 	this.genomes = this.genomes.concat(children);
 	this.mutate();
 	this.speciate();
 	log(this.species.length);
 };

/**
 * Sorts the genomes into different species.
 */
 Neuroevolution.prototype.speciate = function() {
 	this.species = [];
 	for (var i = 0; i < this.genomes.length; i++) {
 		var placed = false;
 		for (var j = 0; j < this.species.length; j++) {
 			if (!placed && this.species[j].genomes.length > 0 && this.isSameSpecies(this.genomes[i], this.species[j].genomes[0])) {
 				this.species[j].genomes.push(this.genomes[i]);
 				placed = true;
 			}
 		}
 		if (!placed) {
 			var newSpecies = new Species();
 			newSpecies.genomes.push(this.genomes[i]);
 			this.species.push(newSpecies);
 		}
 	}
 };

/**
 * Culls all the species to the given amount by removing less fit members of each species.
 * @param  {Number} [remaining] The number of genomes to cull all the species to [Default is half the size of the species].
 */
 Neuroevolution.prototype.cullSpecies = function(remaining) {
 	var toRemove = [];
 	for (var i = 0; i < this.species.length; i++) {
 		this.species[i].cull(remaining);
 		if (this.species[i].genomes.length < 1) {
 			toRemove.push(this.species[i]);
 		}
 	}
 	for (var r = 0; r < toRemove.length; r++) {
 		this.species.remove(toRemove[r]);
 	}
 };

/**
 * Calculates the average fitness of all the species.
 */
 Neuroevolution.prototype.calculateSpeciesAvgFitness = function() {
 	for (var i = 0; i < this.species.length; i++) {
 		this.species[i].calculateAverageFitness();
 	}
 };

/**
 * Creates a baby in the given species, with fitter genomes having a higher chance to reproduce.
 * @param  {Species} species The species to create a baby in.
 * @return {Genome} The resultant baby.
 */
 Neuroevolution.prototype.makeBaby = function(species) {
 	var mum = species.genomes[randomWeightedNumBetween(0, species.genomes.length - 1)];
 	var dad = species.genomes[randomWeightedNumBetween(0, species.genomes.length - 1)];
 	return this.crossover(mum, dad);
 };

/**
 * Calculates the fitness of all the genomes in the population.
 */
 Neuroevolution.prototype.calculateFitnesses = function() {
 	for (var i = 0; i < this.genomes.length; i++) {
 		this.genomes[i].fitness = this.fitnessFunction(this.genomes[i].getNetwork());
 	}
 };

/**
 * Returns the relative compatibility metric for the given genomes.
 * @param  {Genome} genomeA The first genome to compare.
 * @param  {Genome} genomeB The second genome to compare.
 * @return {Number} The relative compatibility metric. 
 */
 Neuroevolution.prototype.getCompatibility = function(genomeA, genomeB) {
 	var disjoint = 0;
 	var totalWeight = 0;
 	var aInnovationNums = {};
 	for (var i = 0; i < genomeA.genes.length; i++) {
 		aInnovationNums[genomeA.genes[i].innovation] = i;
 	}
 	var bInnovationNums = [];
 	for (var j = 0; j < genomeB.genes.length; j++) {
 		bInnovationNums[genomeB.genes[j].innovation] = j;
 	}
 	for (var k = 0; k < genomeA.genes.length; k++) {
 		if (bInnovationNums[genomeA.genes[k].innovation] === undefined) {
 			disjoint++;
 		} else {
 			totalWeight += Math.abs(genomeA.genes[k].weight - genomeB.genes[bInnovationNums[genomeA.genes[k].innovation]].weight);
 		}
 	}
 	for (var l = 0; l < genomeB.genes.length; l++) {
 		if (aInnovationNums[genomeB.genes[l].innovation] === undefined) {
 			disjoint++;
 		}
 	}
 	var n = Math.max(genomeA.genes.length, genomeB.genes.length);
 	return this.deltaDisjoint * (disjoint / n) + this.deltaWeights * (totalWeight / n);
 };

/**
 * Determines whether the given genomes are from the same species.
 * @param  {Genome}  genomeA The first genome to compare.
 * @param  {Genome}  genomeB The second genome to compare.
 * @return {Boolean} Whether the given genomes are from the same species.
 */
 Neuroevolution.prototype.isSameSpecies = function(genomeA, genomeB) {
 	return this.getCompatibility(genomeA, genomeB) < this.deltaThreshold;
 };

/**
 * Returns the genome with the highest fitness in the population.
 * @return {Genome} The elite genome.
 */
 Neuroevolution.prototype.getElite = function() {
 	this.genomes.sort(compareGenomesDescending);
 	return this.genomes[0];
 };


//Private static functions
function sigmoid(t) {
	return 1 / (1 + Math.exp(-t));
}

function randomNumBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomWeightedNumBetween(min, max) {
	return Math.floor(Math.pow(Math.random(), 2) * (max - min + 1) + min);
}

function compareGenomesAscending(genomeA, genomeB) {
	return genomeA.fitness - genomeB.fitness;
}

function compareGenomesDescending(genomeA, genomeB) {
	return genomeB.fitness - genomeA.fitness;
}

Array.prototype.remove = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};


function log(text) {
	console.log(text);
}
