const game = document.querySelector('.game');
var arrFactory = [];
var arrTree = [];
var newFactory;
var interval = 800;
//var counter = 1;

function createGame() {
    for (let i = 0; i < 30; i++) {
        let a = document.querySelector('.game');
        let b = document.createElement('div');
        b.classList.add('box');
        b.setAttribute('data-value', i);
        a.appendChild(b);   
    }
    
}

function replay() {
    var replay = document.querySelector('.replay');
    replay.addEventListener('click', function() {
        box.forEach(function(box) {
            box.classList.remove('green');
            box.classList.remove('tree');

        });
        //counter += 1;
        //document.querySelector('.counter').innerHTML = 'Level: ' + counter;
        document.querySelector('.hidden').classList.add('levelUp')
        let bang = document.querySelector('.won');
        newFactory = setInterval(randomFactory, 600);
        bang.style.animation = 'start .6s ease-in-out';
        bang.style.top = '100%';
    });
}

function addTree(e) {
    let c = e.target;
    
    if(arrTree.indexOf(c.dataset.value) == -1) {
        arrTree.push(c.dataset.value);
        if(arrTree.length == 30) {
            clearInterval(newFactory);
            
            document.querySelector('.hidden').classList.remove('levelUp');
            let bang = document.querySelector('.won');
            bang.style.animation = 'won .6s ease-in-out';
            bang.style.top = '30%';
            replay();
        }
    } 
    

    if(arrFactory.indexOf(c.dataset.value) != -1) {
        arrFactory.splice(arrFactory.indexOf(c.dataset.value) ,1);
    }
    c.classList.remove('red');
    c.classList.remove('factory');
    c.classList.add('green');
    c.classList.add('tree');
    console.log(arrTree);
}

function randomFactory() {
    let e = Math.random() * 30;
    let g = Math.floor(e);
    
    if(arrFactory.indexOf(box[g].dataset.value) == -1) {
        arrFactory.push(box[g].dataset.value);
        box[g].classList.add('red');
        box[g].classList.remove('green');
        box[g].classList.add('factory');
        if(arrFactory.length == 30) {
            clearInterval(newFactory);
        }
    } 
    
    if(arrTree.indexOf(box[g].dataset.value) != -1) {
        arrTree.splice(arrTree.indexOf(box[g].dataset.value), 1);
    }
    console.log(arrFactory);
}

var yol = document.querySelector('.yolo');

createGame();

var box = document.querySelectorAll('.box');
// console.log(box);
var start = document.querySelector('.floating');
start.addEventListener('click', function() {
    let init = document.querySelector('.init');
    init.style.animation = 'start .5s ease-in';
    init.style.top = '100%';
    newFactory = setInterval(randomFactory, interval);
});

box.forEach(function(box) {
    box.addEventListener('click', addTree, false);
}, false);

function fire(e) {
    console.log(e.target);
    let trg = e.target;
    
    const itemDim = this.getBoundingClientRect(),
    itemSize = {
      x: itemDim.right - itemDim.left,
      y: itemDim.bottom - itemDim.top,
    };
    
    let burst = new mojs.Burst({
        left: itemDim.left + (itemSize.x/2),
        top: itemDim.top + (itemSize.y/1.7),
        count: 9,
        radius: {50 : 90},
    });
    burst.play();
};


box.forEach(function(box) {
    box.addEventListener('click', fire);
});