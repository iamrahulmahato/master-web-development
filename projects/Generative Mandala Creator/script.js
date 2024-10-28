const canvas = document.getElementById('mandalaCanvas');
const ctx = canvas.getContext('2d');

function drawMandala() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 * 0.9;
    const layers = 10; // Number of layers in the mandala
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F1C40F', '#9B59B6'];

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    for (let i = 0; i < layers; i++) {
        const angleStep = (Math.PI * 2) / (i + 3); // Increase number of points with layers
        const currentRadius = radius * (i + 1) / layers; // Radius of the current layer

        for (let j = 0; j < i + 3; j++) {
            const angle = j * angleStep;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + currentRadius * Math.cos(angle), centerY + currentRadius * Math.sin(angle));
            ctx.strokeStyle = colors[i % colors.length]; // Cycle through colors
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
}

document.getElementById('generateButton').addEventListener('click', drawMandala);

// Generate the first mandala on page load
drawMandala();
