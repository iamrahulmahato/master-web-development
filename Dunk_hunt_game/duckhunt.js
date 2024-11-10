window.onload = function() {
    var body = document.body;

    console.log(body);

    // Création d'une div de class "duck" dans le body

    var duck = document.createElement('div');
    duck.className = 'duck';
    duck.style.top = Math.random() * window.innerWidth + 'px';
    duck.style.left = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(duck);
    setTimeout(function() { duck.remove() }, 1)

    // Création d'un objet 'Duck' pour interpréter les Canards
    function createDuck() {
        var duck = document.createElement('div');
        duck.className = 'duck';
        duck.style.top = Math.random() * window.innerWidth + 'px';
        duck.style.left = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(duck);
        var flapper = setInterval(function flapDuck() {
            duck.classList.toggle('flap');
        }, 250);
    // Création d'une function permettant de faire bouger aléatoirement les Canards
        function moveDuck() {
            var top = Math.random() * window.innerWidth;
            var left = Math.random() * window.innerHeight;

            duck.style.top = top + 'px';
            duck.style.left = left + 'px';
    // Création d'une function de tire
            function addShot() {
                duck.classList.add('shot');
                setTimeout(function() { duck.remove(); checkForWinner() }, 1000)
            }

            duck.addEventListener('click', addShot);
        }
    // Un temps d'intervalle entre les mouvements des Canards
        moveDuck()
        var mover = setInterval(moveDuck, 1000);
        return duck;
    };

    for (var i = 0; i < 5; i++) {
        createDuck()
    }
    // Création d'une function pour vérifier si le joeueur a gagné
    function checkForWinner() {
    if (document.getElementsByClassName('duck').length == 0) {
        alert('You win!')
      }
    }

};