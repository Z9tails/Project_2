// setting up the canvas elements
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gravity = 0.5;

// begin main player class
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30;
        this.height = 30;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    // to get the player to move
    update() {
        this.draw();
        this.position.y += this.velocity.y;

        // to add velocity as player falls
        if (this.position.y + this.height + this.velocity.y 
            <= canvas.height )
        this.velocity.y += gravity;
        else this.velocity.y = 0;
    }
};

const player = new Player();
player.update();

// fuction to create a loop to create movement
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
};

animate();
