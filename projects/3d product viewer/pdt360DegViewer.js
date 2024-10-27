var call = 0;

function pdt360DegViewer(id, n, p, t, playable, autoPlay, draggable, mouseMove, buttons, keys, scroll) {
    console.log(`${call}-${id}-${playable ? 'playable ' : ''}${autoPlay ? 'autoPlay ' : ''}${draggable ? 'draggable ' : ''}${mouseMove ? 'mouseMove ' : ''}${buttons ? 'buttons ' : ''}${keys ? 'keys' : ''}${scroll ? 'scroll ' : ''}`);
    call++;
    loaderNone(id);
    var i = 1, j = 0, move = [],
        mainDiv = document.querySelector(`#${id}`);
    mainDiv.className = 'viewer';
    mainDiv.innerHTML += `<img class="${id} ${playable ? 'playable ' : ''}${autoPlay ? 'autoPlay ' : ''}${draggable ? 'draggable ' : ''}${mouseMove ? 'mouseMove ' : ''}${buttons ? 'buttons ' : ''}${keys ? 'keys ' : ''}${scroll ? 'scroll ' : ''}" draggable="false" src='${p}${i}.${t}'>`;
    mainDiv.innerHTML +=
           '<div class="loader"><div class="three-bounce"><div class="one"></div><div class="two"></div><div class="three"></div></div></div>'

    if (call == 1)
        for (var k = 1; k <= n; k++) {
            document.getElementById('dummy').innerHTML += `<img src='${p}${k}.${t}'>`;
        }

    var img = document.querySelector(`#${id} .${id}`);

    if (!playable && !autoPlay) {
        var touch = false;
        (window.matchMedia("screen and (max-width: 992px)").matches) ? touchFun() : nonTouch();

        //For Touch Devices
        window.addEventListener('touchstart', function () {
            touchFun();
        });

        function touchFun() {
            touch = true;
            img.removeAttribute('draggable');
            img.addEventListener('touchmove', function (e) {
                logic(this, e);
            });
            img.addEventListener('touchend', function (e) {
                move = [];
            });
        }
        //For Non-Touch Devices
        function nonTouch() {
            touch = false;
            if (draggable) {
                var drag = false;
                img.addEventListener('mousedown', function (e) {
                    drag = true;
                    logic(this, e);
                });
                img.addEventListener('mouseup', function (e) {
                    drag = false;
                    move = [];
                });
                mouseEvent();
            }

            if (mouseMove) {
                drag = true;
                mouseEvent();
            }
            function mouseEvent() {
                img.addEventListener('mousemove', function (e) {
                    (drag) ? logic(this, e) : null;
                });
                img.addEventListener('mouseleave', function () {
                    move = [];
                });
            }
            if (scroll) {
                img.addEventListener('wheel', function (e) {
                    e.preventDefault();
                    (e.wheelDelta / 120 > 0) ? nxt(this) : prev(this);
                });
            }
            if (keys) {
                img.setAttribute('tabindex', '0');
                img.onkeydown = function (e) {
                    e.preventDefault();
                    if (e.keyCode == 37 || e.keyCode == 38)
                        prev(img);
                    else if (e.keyCode == 39 || e.keyCode == 40)
                        nxt(img);
                };
            }
        }
        function logic(el, e) {
            j++;
            var x = touch ? e.touches[0].clientX : e.clientX;
            var coord = (x - img.offsetLeft);
            move.push(coord);

            var l = move.length,
                oldMove = move[l - 2],
                newMove = move[l - 1];
            var thresh = touch ? true : !(j % 3);
            if (thresh) {
                if (newMove > oldMove)
                    nxt(el);
                else if (newMove < oldMove)
                    prev(el);
            }
        }
        if (buttons) {
            var btnsDiv = document.createElement('div');
            btnsDiv.className = 'btnDiv navDiv';

            var leftNavBtn = document.createElement('button');
            leftNavBtn.className = 'play leftNav';
            leftNavBtn.setAttribute('title', 'left navigation');
            btnsDiv.appendChild(leftNavBtn);
            leftNavBtn.addEventListener('click', function () {
                prev(img);
            });

            var rightNavBtn = document.createElement('button');
            rightNavBtn.className = 'play rightNav';
            rightNavBtn.setAttribute('title', 'right navigation');
            btnsDiv.appendChild(rightNavBtn);
            rightNavBtn.addEventListener('click', function () {
                nxt(img);
            });
            img.parentNode.appendChild(btnsDiv);
        }
    } else {
        var interval, playing = false,
            pause = false,
            left = false,
            right = false,
            speed = 50;

        if (playable) {
            var btnDiv = document.createElement('div');
            btnDiv.className = 'btnDiv';

            var playBtn = document.createElement('button');
            playBtn.className = 'play';
            playBtn.setAttribute('title', 'play');
            btnDiv.appendChild(playBtn);
            playBtn.addEventListener('click', function () {
                playing = true;
                pause = false;
                play();
            });

            var pauseBtn = document.createElement('button');
            pauseBtn.className = 'pause';
            pauseBtn.setAttribute('title', 'pause');
            btnDiv.appendChild(pauseBtn);
            pauseBtn.addEventListener('click', function () {
                pause = true;
            });

            var stopBtn = document.createElement('button');
            stopBtn.className = 'stop';
            stopBtn.setAttribute('title', 'stop');
            btnDiv.appendChild(stopBtn);

            stopBtn.addEventListener('click', function () {
                pause = true;
                speed = 50;
                right = true;
                left = false;
                this.parentNode.parentNode.querySelector('img').src = `${p}${i = 1}.${t}`;
            });

            var leftBtn = document.createElement('button');
            leftBtn.className = 'left';
            leftBtn.setAttribute('title', 'play direction-left');
            btnDiv.appendChild(leftBtn);
            leftBtn.addEventListener('click', function () {
                right = false;
                left = true;
                if (playing)
                    play();
            });

            var rightBtn = document.createElement('button');
            rightBtn.className = 'right';
            rightBtn.setAttribute('title', 'play direction-right');
            btnDiv.appendChild(rightBtn);
            rightBtn.addEventListener('click', function () {
                left = false;
                right = true;
                if (playing)
                    play();
            });

            var speedBtn = document.createElement('button');
            speedBtn.className = 'plus';
            speedBtn.setAttribute('title', 'increase play speed');
            btnDiv.appendChild(speedBtn);
            speedBtn.addEventListener('click', function () {
                if (playing)
                    timer(speed > 10 ? speed -= 10 : speed);
            });

            var slowBtn = document.createElement('button');
            slowBtn.className = 'minus';
            slowBtn.setAttribute('title', 'decrease play speed');
            btnDiv.appendChild(slowBtn);
            slowBtn.addEventListener('click', function () {
                if (playing)
                    timer(speed < 100 ? speed += 10 : speed);
            });

            mainDiv.prepend(btnDiv);
        }

        function play() {
            timer(speed);
        }

        function timer(t) {
            clearInterval(interval);
            interval = setInterval(function () {
                if (!pause) {
                    if (left)
                        prev(img);
                    else if (right)
                        nxt(img);
                    else
                        nxt(img);
                }
            }, t);
        }
    }

    function prev(e) {
        if (i <= 1) {
            i = n;
            e.src = `${p}${--i}.${t}`;
            nxt(e);
        } else
            e.src = `${p}${--i}.${t}`;
    }
    function nxt(e) {
        if (i >= n) {
            i = 1;
            e.src = `${p}${++i}.${t}`;
            prev(e);
        } else
            e.src = `${p}${++i}.${t}`;
    }
    function loaderNone(id) {
        window.addEventListener('load',function(){
            document.querySelector(`#${id} .loader`).style.display = 'none';
            if (autoPlay) {
                pause = false;
                play();
            }
        });
    }
}
