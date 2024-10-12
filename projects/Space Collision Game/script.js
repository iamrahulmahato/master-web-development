const popup = document.getElementById("game-over");
const canvas = document.querySelector('#canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
let animation;

// const coinImage = document.getElementById("coin");
const coinImage = new Image();
coinImage.src = "./img/pixel-art-coin-money-icon-game.png";
coinImage.width = 20;

// const bombImage = document.getElementById("bomb");
const bombImage = new Image();
bombImage.src = "./img/bomb-icon-symbol-video-game.png";
bombImage.width = 5;

let score = 0
let strikes = 0
document.getElementById("close-btn").onclick = () => {
    document.getElementById("strikes").textContent = '';
    animate()
    popup.close()
}

const mouse = {
    x: -100,
    y: -100
};

addEventListener("load", () => {
    alert("WELCOME TO THE GAME!!! CATCH THE COIN!!")
})

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

// addEventListener('resize', () => {
//     canvas.width = innerWidth
//     canvas.height = innerHeight
//     init()
//      animate()
// })

// Objects
class Particle {
    constructor(x, y, radius, color, strokeColor, image) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.strokeColor = '#222222'
        this.mass = 1
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        }
        this.image = coinImage
    }

    draw() {
        if (this.color == "red") {
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.fill()
            c.strokeStyle = this.strokeColor
            c.stroke()
            c.closePath()
        } else {
            c.drawImage(this.image, this.x, this.y, this.radius, this.radius)
        }
    }

    update(particles) {
        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) {
                continue;
            }
            if (collided(this.x, this.y, this.radius, particles[i].x, particles[i].y, particles[i].radius)) {
                resolveCollision(this, particles[i]);
            }
        }

        if (collided(player.x, player.y, player.radius, this.x, this.y, this.radius)) {
            // STRIKES
            if (this.color == 'red') {
                strikes++;
                document.getElementById("strikes").textContent += '⨯';
                // GAME OVER
                if (strikes >= 5) {
                    popup.showModal();
                    document.getElementById("game-over-score").textContent = score;
                    score = 0
                    strikes = 0
                    window.cancelAnimationFrame(animation)

                }
                // POINTS 
            } else {
                score++;
            }
            document.querySelector('#score').textContent = (score >= 10) ? score : `0${score}`;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
        if (this.x - this.radius <= 0 || this.radius + this.x >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius <= 0 || this.radius + this.y >= canvas.height) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.draw()
    }
}
class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        // c.arc(this.x, this.y, this.radius, Math.PI/6, Math.PI /2, true)
        c.ellipse(this.x, this.y, this.radius, this.radius, 1, 0, Math.PI * 2, true)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }
}



function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}


function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}



function collided(x1, y1, r1, x2, y2, r2) {
    let h = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));// distance formula
    if (h < r1 + r2) {
        return true;
    }
    return false;
}

let player, particles = [];
// Implementation
function init() {
    player = new Player(undefined, undefined, 20, 'white');
    // good partilces
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, 22, '#FFD700', coinImage));
    }
    // bad particles
    for (let i = 0; i < 40; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, 5, 'red', ""));
    }
}

// Animation Loop
function animate() {
    animation = requestAnimationFrame(animate)
    // c.clearRect(0, 0, canvas.width, canvas.height);
    c.rect(0, 0, canvas.width, canvas.height);
    c.fillStyle = '#00001122'
    c.fill();

    player.update();
    player.x = mouse.x;
    player.y = mouse.y;
    particles.forEach(particle => {
        particle.update(particles);
    });

}

init()
animate()