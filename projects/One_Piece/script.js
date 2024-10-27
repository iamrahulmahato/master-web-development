const $left = document.querySelector('.left');
const $right = document.querySelector('.right');
const $slider = document.querySelector('ol');

const WIDTH = document.querySelector(`.slider`).clientWidth;
const totalWidth = $slider.querySelectorAll('li').length * WIDTH;

$slider.style.width = `${totalWidth}px`;
$slider.prepend($slider.querySelector(`li:last-child`));
$slider.style.left = `-${WIDTH}px`;

const move = (s) => {
    const v = (WIDTH * s) - WIDTH;
    $slider.style.transition = `all 0.3s ease`;
    $slider.style.left = `${v}px`;
    setTimeout(() => {
        if( s > 0 ) {
            $slider.prepend($slider.querySelector(`li:last-child`));
        } else {
            $slider.append($slider.querySelector(`li:first-child`));
        }
        $slider.style.transition = `none`;
        $slider.style.left = `-${WIDTH}px`;
    }, 500);
};

$left.onclick = () => {
    move(1);
    audio.play();
};

$right.onclick = () => {
    move(-1);
    audio.play();
};

let playInterval = null;
autoplay.onchange = () => {
    if (autoplay.checked) {
        playInterval = setInterval(() => {
            move(-1);
        }, 1500);
    } else {
        clearInterval(playInterval);
    }
};

const audio = new Audio('./audio/Overtaken.mp3');


audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
});
audio.play();
