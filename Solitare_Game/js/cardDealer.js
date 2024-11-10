function CardDealer() {

	var that = this;

	this.shuffle = function(allCardsArr) { 
		var i = allCardsArr.length;
		var j, t;
		while(i) {
			j =  Math.floor((i--) * Math.random());
			t = allCardsArr[i];
			allCardsArr[i] = allCardsArr[j];
			allCardsArr[j] = t;	
		}
	};

	this.reUpload = function(allCardsArr) {
		var ul = document.createElement('ul');
		for(var i = 0; i < allCardsArr.length; i++) {
			var li = document.createElement('li');
			li.className = 'card closed';
			li.classList.add(allCardsArr[i]);
			li.dataset.card = allCardsArr[i];
			ul.appendChild(li);
		}
		cardDeckEl.innerHTML = ul.innerHTML; 
		ul = null;
	}

	this.delivery = function(n, opened, animation) {
		var cols = document.querySelectorAll('.column');
		var c = 0;
		
		for (var i = 0; i< n; i++) {
			if (opened) {
				cardDeckEl.lastElementChild.classList.add('open');
				cardDeckEl.lastElementChild.classList.remove('closed');
			}
			
			animation ?
				cols[c].animationAppendChild(cardDeckEl.lastElementChild)
			:	cols[c].appendChild(cardDeckEl.lastElementChild);

			if(++c >= cols.length) 
				c = 0;	
		}
	}

	this.checkEmpty = function (elems) {
		for (var i = 0; i < elems.length; i++) {
			if(!elems[i].children[0]) 
				return true;
		}
	}

	this.checkStartDrag = function(target, selectors) {
		var parent = target.parentNode;

		if ( !target.classList.contains('card') ) {
			return
		}
		if ( !target.classList.contains('open') ) {
			return;
		}
		if ( parent.lastElementChild == target ) {
			return true;
		} 
			
		var sibling = target.nextElementSibling;
		var str = '';

		while (sibling) {
			str += ' + .' + sibling.dataset.card;    //contains s112 if the sibling is the queen of spades
			sibling = sibling.nextElementSibling;
		}

		str = '.' + target.dataset.card + str;

		if ( ~selectors.join('').indexOf(str) ) 
			return true;
	};

	this.showCongratulation = function() {
		document.querySelector('.congratulation').style.display = 'block';
	}

	this.hideCongratulation = function() {
		document.querySelector('.congratulation').style.display = 'none';
	}

	this.hint = function(allCards, allPlaces, selectors) {
		this.hintCount = dealer.hintCount || 0;
		var find = search(this.hintCount) || search(0);
		if (!find) return;

		find[0].classList.add('backlight');

		setTimeout(function() {
			find[1].classList.add('backlight');
		}, 200);

		setTimeout(function() {
			find[0].classList.remove('backlight');
			find[1].classList.remove('backlight');
		}, 1500);

		function search(position) {
			for (var i = position; i < allCards.length; i++) {
				dealer.hintCount = i + 1;
				if (!dealer.checkStartDrag(allCards[i], selectors))
					continue;
				var card1 = +allCards[i].dataset.card.slice(1);  //returns integer like 105

				for (var j = 0; j < allPlaces.length; j++) {
					if (allCards[i].parentNode == allPlaces[j].parentNode) continue;
					var card2 = +allPlaces[j].dataset.card.slice(1);

					if (card1 + 1 == card2){ 

						hintSound = new Sound('audio/hint.mp3');
						hintSound.play();
						return [allCards[i], allPlaces[j]];

					}
				}
			}
		}
	};



	this.showMessage = function(text, left, top) {
		if (document.getElementById('message1')) { 
			return;
		}
		var el = document.createElement('div');
		el.innerHTML = text;
		el.setAttribute('id', 'message1');
		el.className = 'message';
		el.style.left = left + 'px';
		el.style.top = top + 'px';
		document.body.appendChild(el);
		setTimeout(function() {
			document.body.removeChild(el) 
		}, 2500);
	}

	this.showFaq = function(){
		document.getElementById('faq').style.left = '0%'; 
	}

	this.closeFaq = function(){
		document.getElementById('faq').style.left = '-100%'; 
	}

	this.closeScoreBoard = function(){
		document.getElementById('scoreBoard').style.display = 'none'; 
	}


	this.getLimitHeight = function() {
		var lowerEl = document.querySelector('.offside');
		var innerEl = lowerEl.querySelector('.card');
		var innerHeight = 0;
		if (innerEl){
			innerHeight = getComputedStyle(innerEl).height.slice(0, -2); 
		}
		return lowerEl.getBoundingClientRect().bottom - innerHeight; 
		return false;
	}

	this.setSuitedHeight = function(el, maxHeight) {
		el.dataset.height = '';	
		var c = 1;
		while(el.getBoundingClientRect().bottom > maxHeight) {
			el.dataset.height = c;
			if(++c > 5)
				break;
		}
	}

	this.takeAway = function(selectors, dropoutEl, animation) {
		var coinc = [];

		for (var i = 0; i < selectors.length; i++) {
			var elems = document.querySelectorAll('.open' + cardDeck.selectors[i]);
			elems = Array.prototype.slice.call(elems);	
			coinc = coinc.concat(elems);
		}

		while (coinc[0]) {
			var p = coinc.pop().parentNode;

			for (var i = 12; i >= 0; i--) {
				animation ? 
					dropoutEl.animationAppendChild(p.lastElementChild) :
				dropoutEl.appendChild(p.lastElementChild);
				if (p.children[0]) {
					p.lastElementChild.classList.add('open');
					p.lastElementChild.classList.remove('closed');
				}   
			}
		}
	};








}

