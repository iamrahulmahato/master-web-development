const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let particles = [];

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 5 + 2; // Random radius between 2 and 7
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
        this.vx = (Math.random() - 0.5) * 2; // Random velocity in x direction
        this.vy = (Math.random() - 0.5) * 2; // Random velocity in y direction
        this.gravity = 0.1; // Gravity effect
        this.friction = 0.98; // Friction effect
    }

    update() {
        this.vy += this.gravity; // Apply gravity
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;

        // Check boundaries and bounce
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx = -this.vx; // Reverse x velocity
        }
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius; // Keep particle above ground
            this.vy = -this.vy * this.friction; // Reverse y velocity
        } else if (this.y - this.radius < 0) {
            this.vy = -this.vy; // Reverse y velocity
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create a new particle on mouse click
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    particles.push(new Particle(x, y));
});

// Reset particles
document.getElementById('resetButton').addEventListener('click', () => {
    particles = []; // Clear particles
});

// Change background color
document.getElementById('changeBgButton').addEventListener('click', () => {
    document.body.style.background = `hsl(${Math.random() * 360}, 100%, 90%)`; // Random background color
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate); // Repeat the animation
}

// Start the animation loop
animate();
