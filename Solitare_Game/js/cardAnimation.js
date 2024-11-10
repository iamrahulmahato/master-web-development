Node.prototype.animationAppendChild = function(child) {

	var startCoords = {
		top: child.getBoundingClientRect().top,
		left: child.getBoundingClientRect().left
	}

	this.appendChild(child);

	var endCoords = {
		top: child.getBoundingClientRect().top,
		left: child.getBoundingClientRect().left
	}

	child.style.display = 'none'; 

	var ghost = document.createElement('div');
	ghost.className = child.className;
	ghost.classList.add('ghost');
	ghost.style.top = startCoords.top - 150 + 'px';
	ghost.style.left = startCoords.left + 'px';
	document.body.insertBefore(ghost,document.body.children[0]);

	var queue = document.querySelectorAll('.ghost').length -2;
	ghost.style.transitionDelay = queue*100 + 'ms';

	setTimeout(function(){
		ghost.style.top = endCoords.top + 'px';
		ghost.style.left = endCoords.left + 'px';
	},0);
	
	ghost.addEventListener('transitionend', function(e) {
		if (!e.target.parentNode)
			return;
		child.style.display = '';
		ghost.parentNode.removeChild(ghost);
		ghost = null;
	});

	return child;
};
