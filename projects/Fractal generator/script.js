const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const infoDisplay = document.getElementById('info');

let width, height;
let zoom = 1;
let moveX = 0;
let moveY = 0;

function setupCanvas() {
    width = window.innerWidth < 600 ? window.innerWidth : 600; // Responsive width
    height = width; // Keep canvas square
    canvas.width = width;
    canvas.height = height;
    drawFractal();
    updateInfo();
}

function drawFractal() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const realPart = (x - width / 2) / (width / 4) * zoom + moveX;
            const imaginaryPart = (y - height / 2) / (height / 4) * zoom + moveY;
            const iterations = mandelbrot(realPart, imaginaryPart);

            const colorValue = iterations === 100 ? 0 : (iterations * 255 / 100);
            ctx.fillStyle = `rgb(${colorValue}, 0, ${colorValue})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function mandelbrot(realPart, imaginaryPart) {
    let r = 0;
    let i = 0;
    let iterations = 0;

    while (iterations < 100 && (r * r + i * i) < 4) {
        const rNew = r * r - i * i + realPart;
        i = 2 * r * i + imaginaryPart;
        r = rNew;
        iterations++;
    }
    return iterations;
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    moveX += (x - width / 2) / (width / 4) * zoom;
    moveY += (y - height / 2) / (height / 4) * zoom;
    zoom *= 0.5; // Zoom in
    drawFractal();
    updateInfo();
});

resetButton.addEventListener('click', () => {
    zoom = 1;
    moveX = 0;
    moveY = 0;
    drawFractal();
    updateInfo();
});

// Adjust canvas on window resize
window.addEventListener('resize', setupCanvas);

// Function to update the info display
function updateInfo() {
    infoDisplay.textContent = `Zoom: ${zoom.toFixed(2)}, Position: (${moveX.toFixed(2)}, ${moveY.toFixed(2)})`;
}

// Initial setup
setupCanvas();
