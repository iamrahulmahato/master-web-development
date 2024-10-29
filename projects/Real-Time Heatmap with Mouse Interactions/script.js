const canvas = document.getElementById('heatmapCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const heatmapData = [];
const maxIntensity = 100; // Maximum intensity for the heatmap

// Create a grid for heatmap data
function createGrid() {
    for (let y = 0; y < canvas.height; y += 10) {
        for (let x = 0; x < canvas.width; x += 10) {
            heatmapData.push({
                x: x,
                y: y,
                intensity: 0
            });
        }
    }
}

function drawHeatmap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heatmapData.forEach(point => {
        const alpha = point.intensity / maxIntensity;
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`; // Base color for heatmap
        ctx.beginPath();
        ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateHeatmap(x, y) {
    heatmapData.forEach(point => {
        const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
        if (distance < 100) {
            point.intensity = Math.min(maxIntensity, point.intensity + (maxIntensity - distance / 2));
        }
    });
    drawHeatmap();
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    updateHeatmap(x, y);
});

// Initialize grid
createGrid();
drawHeatmap();
