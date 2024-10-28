// script.js
const canvas = document.getElementById('fabricCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const patternSelect = document.getElementById('patternSelect');
const resetBtn = document.getElementById('resetBtn');

// Set the initial fabric color
let fabricColor = colorPicker.value;

// Draw the fabric background
function drawFabric() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fabricColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const selectedPattern = patternSelect.value;
    if (selectedPattern) {
        drawPattern(selectedPattern);
    }
}

// Draw selected pattern
function drawPattern(pattern) {
    ctx.fillStyle = fabricColor;
    switch (pattern) {
        case 'dots':
            for (let x = 0; x < canvas.width; x += 20) {
                for (let y = 0; y < canvas.height; y += 20) {
                    ctx.beginPath();
                    ctx.arc(x + 10, y + 10, 5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            break;
        case 'stripes':
            ctx.fillStyle = fabricColor;
            for (let i = 0; i < canvas.width; i += 20) {
                ctx.fillRect(i, 0, 10, canvas.height);
            }
            break;
        case 'checkered':
            for (let x = 0; x < canvas.width; x += 20) {
                for (let y = 0; y < canvas.height; y += 20) {
                    ctx.fillStyle = (x / 20 + y / 20) % 2 === 0 ? fabricColor : '#ffffff';
                    ctx.fillRect(x, y, 20, 20);
                }
            }
            break;
        default:
            break;
    }
}

// Event listeners
colorPicker.addEventListener('input', (e) => {
    fabricColor = e.target.value;
    drawFabric();
});

patternSelect.addEventListener('change', (e) => {
    drawFabric();
});

resetBtn.addEventListener('click', () => {
    fabricColor = '#ff0000'; // reset to default color
    colorPicker.value = fabricColor;
    patternSelect.value = '';
    drawFabric();
});

// Initial drawing
drawFabric();
