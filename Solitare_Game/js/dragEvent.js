function DragEvents() {
	this.el = document.getElementById('drag-el');
	this.shiftX = 0;
	this.shiftY = 0;
	var that = this;
	this.parentOld = '';


	//Start Drag
	this.startDrag = function(e) { 
		var t = e.target;		
		if (!cardDeck || that.el.children[0] || !dealer.checkStartDrag(t, cardDeck.selectors)){
			return;
		}

		that.shiftX = e.pageX - t.getBoundingClientRect().left;
		that.shiftY = e.pageY - t.getBoundingClientRect().top;
		that.el.style.left = e.pageX - that.shiftX + 'px';
		that.el.style.top = e.pageY - that.shiftY + 'px';

		while (t != t.parentNode.lastElementChild) {
			console.log(t.parentNode.lastElementChild);
			that.el.insertBefore(t.parentNode.lastElementChild, that.el.children[0]);
		}

		that.parentOld = t.parentNode;
		that.el.insertBefore(t, that.el.children[0]);
		e.preventDefault();
	}

	//Move Drag
	this.moveDrag = function(e) {
		if ( !that.el.children[0] ) 
			return;
		console.log('pagex',e.pageX);
		console.log('shiftx',that.shiftX);
		that.el.style.left = e.pageX - that.shiftX + 'px';
		that.el.style.top = e.pageY - that.shiftY + 'px';

		e.preventDefault();
	}

	//End Drag
	this.endDrag = function() {

		if ( !that.el.children[0] ) 
			return;

		that.parentNew = that.getDroppable(that.el.children[0], that.parentOld);

		while (that.el.children[0]) {
			if (that.parentNew) {
				that.parentNew.appendChild(that.el.children[0]);

			}
			else
				that.parentOld.appendChild(that.el.children[0]);
		}

		if (that.parentNew && that.parentOld.children[0]) {
			that.parentOld.lastElementChild.classList.add('open');
			that.parentOld.lastElementChild.classList.remove('closed');
		}

		if (that.parentNew) {
			dealer.takeAway(cardDeck.selectors, dropout, true);
			dealer.setSuitedHeight(that.parentNew, limitHeight);
			dealer.setSuitedHeight(that.parentOld, limitHeight);
		}

		if (dropout.children.length == 104){ 
			dealer.showCongratulation();
			clearInterval(timeKeeper);
			UpdateScore();
			bgSound = new Audio('audio/bg-music.mp3');
			bgSound.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
			bgSound.play();


		}
	};

	this.getDroppable = function(target, source) { 
		if (!target) return;

		var pointX = target.getBoundingClientRect().left + target.offsetWidth/2; //offset width = viewable width inc. padding border scrollbar
		var pointY = target.getBoundingClientRect().top - 3;

		this.container = document.elementFromPoint(pointX, pointY); //returns the top element at the specified coordinates i.e the next hidden card to be opened.		
		console.log("container",this.container);

		while (this.container) {
			if (this.container.classList.contains('column'))  //If there is no hidden element 
				break;
			this.container = this.container.parentElement;
		}

		if (!this.container || this.container === source) 
			return;

		if ( !this.container.children[0] )
			return this.container;

		var cardNum1 = +target.dataset.card.slice(1); //Returns only a number that can be compared --> Represents target
		var cardNum2 = +this.container.lastElementChild.dataset.card.slice(1); // Represents last element of new parent
		if ( cardNum1 + 1 == cardNum2 ) {
			noOfMoves++;
			var moves = document.getElementById("score");
			moves.innerHTML = noOfMoves;	
			popSound = new Sound('audio/pop.mp3');
			popSound.play();
			return this.container;
		}
		dragSound = new Sound('audio/drag.mp3');
		dragSound.play();

	};

}