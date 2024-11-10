var cardDeckEl = document.getElementById('source'); //Source cards
var dropout = document.getElementById('dropout');

dragObj = new DragEvents();
dealer = new CardDealer();
var timeKeeper = 0;
var noOfMoves = 0;
var score = 500;
var limitHeight, cardDeck;


document.getElementById('start-btn').onclick = function() {
	document.querySelector('.home-screen').style.display = 'none';
	document.querySelector('.start-form').style.display = 'block';
	document.querySelector('.control-panel').style.display = 'none';
}

document.forms.startGame.onsubmit = function(e) {
	cardDeck = new CardDeck(); 
	cardDeck.getValueFromRadioButton(this.radioBtn);
	cardDeck.init();
	cardDeck.create();		

	dealer = new CardDealer();
	dealer.shuffle(cardDeck.getCards());
	dealer.reUpload(cardDeck.getCards()); 
	dealer.delivery(44,false,true);	
	dealer.delivery(10,true,true);

	document.querySelector('.control-panel').style.display = 'block';
	document.querySelector('.timer').style.display = 'block';
	document.querySelector('.score').style.display = 'block';
	document.querySelector('.opaque').classList.remove('opaque'); 

	timer = new TimeCounter();
	timeKeeper = setInterval(timer.setTime, 1000);
	this.style.display = 'none';
	return false;
}

cardDeckEl.onclick = function(e) {
	if (this.lastElementChild != e.target)
		return;
	var empty = dealer.checkEmpty(document.querySelectorAll('.column'));
	if (empty) {
		var msg = 'Cannot send cards to empty column';
		dealer.showMessage(msg,e.pageX-320,e.pageY-80);
		return;
	}
	dealer.delivery(10,true,true);
	//	dealer.takeAway(cardDeck.selectors, dropout, true);
	var cols = document.querySelectorAll('.column');
	limitHeight = dealer.getLimitHeight();
	for (var i = 0; i < cols.length; i++) {
		dealer.setSuitedHeight(cols[i], limitHeight);
	}
}

var moves = document.getElementById("score");

//On Restart Game Button Click
document.querySelector('.btn-new').onclick = function(e) {
	if (!cardDeck) return;
	if (dropout.children.length == 104) 
		dealer.hideCongratulation();

	dropout.innerHTML = '';
	var cols = document.querySelectorAll('.column');
	for (var i = 0; i < cols.length; i++) {
		cols[i].innerHTML = '';
	}
	dealer.shuffle(cardDeck.getCards());
	dealer.reUpload(cardDeck.getCards());
	dealer.delivery(44,false,true);
	dealer.delivery(10, true,true);

	noOfMoves = 0;
	var moves = document.getElementById("score");
	moves.innerHTML = noOfMoves;

	timer = new TimeCounter();
	clearInterval(timeKeeper);
	timeKeeper = setInterval(timer.setTime, 1000);
};


document.querySelector('.btn-hint').onclick = function(e) {
	var allCards = document.querySelectorAll('.column .card.open');
	var allPlaces = document.querySelectorAll('.column .card.open:last-child');
	
	if (allCards.length == 0) {
		return; 	
	} 
	else if (allPlaces.length < 10) {
		var text = 'Fill all the columns for hint :)';
		dealer.showMessage(text, e.pageX-80, e.pageY-80);
		return;
	}
	dealer.hint(allCards, allPlaces, cardDeck.selectors);
};


document.addEventListener('touchstart', function(e) {
	if (e.targetTouches[0].target != e.target) return;
	dragObj.startDrag(e);
});

document.addEventListener('mousedown', function(e) {
	if (e.which != 1){
		return;   //e.which = returns numeric keycode for the key pressed or mouse pressed. numeric keycode for mouse pressed = 1
	} 
	dragObj.startDrag(e);
});

document.addEventListener('touchmove', dragObj.moveDrag);
document.addEventListener('mousemove', dragObj.moveDrag);

document.addEventListener('touchend', dragObj.endDrag);
document.addEventListener('mouseup', dragObj.endDrag);  


highScores = document.querySelector('ol#high-scores');


var scoreBoard = 	document.getElementById('scoreBoard');
document.querySelector('#high-score-btn').onclick = function() {
	scoreBoard.style.display = 'block';
}


function HighScores() {
	if(typeof(Storage)!=="undefined"){
		var scores = false;
		if(localStorage["highScores"]) {
			highScores.style.display = "block"; 
			highScores.innerHTML = '';  
			scores = JSON.parse(localStorage["highScores"]);
			scores = scores.sort(function(a,b){return parseInt(a)-parseInt(b)});

			for(var i = 0; i < 10; i++){
				var s = scores[i];     

				var fragment = document.createElement('li');
				fragment.innerHTML = (typeof(s) != "undefined" ? s : "" );
				highScores.appendChild(fragment);
				console.log(highScores);
			}	
		}
	} 
	else
	{
		highScores.style.display = "none";
	}
}


HighScores();

function UpdateScore() {
	if(typeof(Storage)!=="undefined"){
		var current = parseInt(moves.innerHTML); //moves=score
		var scores = false;
		if(localStorage["highScores"]) {

			scores = JSON.parse(localStorage["highScores"]);
			scores = scores.sort(function(a,b){return parseInt(a)-parseInt(b)});

			for(var i = 0; i < 10; i++){
				var s = parseInt(scores[i]);

				var val = (!isNaN(s) ? s : 0 );
				if(current > val)
				{
					val = current;
					scores.splice(i, 0, parseInt(current));
					break;
				}
			}

			scores.length = 10;                                
			localStorage["highScores"] = JSON.stringify(scores);

		} else {                        
			var scores = new Array();
			scores[0] = current;
			localStorage["highScores"] = JSON.stringify(scores);
		}

		HighScores();
	} 
}