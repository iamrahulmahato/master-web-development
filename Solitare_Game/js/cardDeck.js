function CardDeck() {
	this.suit = ['s','h','c','d'];
	this.pattern = [];
	this.selectors = [];
	this.newDeck = [];
	this.cards = [];

	var that = this;

	this.getValueFromRadioButton = function(buttons) {
		for(var i = 0; i < buttons.length; i++) {   
			this.button = buttons[i];

			if(this.button.checked) {
				this.radioBtnValue = this.button.value;
				return this.radioBtnValue;
			}
		}
		return null; 		
	}

	//Init Start
	this.init = function() {
		noOfMoves = 0;
		for(var i = 0; i <= 12; i++) {
			this.pattern[i] = i + 101;
		}

		for(i = 0; i < this.radioBtnValue; i++) {
			this.selectors[i] = '';
			for (var j = 12; ;) {
				this.selectors[i] += '.' + this.suit[i] + this.pattern[j];
				if(--j < 0){
					break;
				}
				this.selectors[i] += ' + ';		
			}
		}

		for (i=0; i < this.radioBtnValue; i++) {
			this.pattern.forEach(function(item){
				that.newDeck.push(that.suit[i] + item);
			});
		}
	}
	
	this.create = function() {
		while (104 / this.newDeck.length > 1)	{
			that.newDeck = that.newDeck.concat(that.newDeck);	
		}
		this.cards = that.newDeck; 
	}

	this.getCards = function() {
		return this.cards;
	}
}

