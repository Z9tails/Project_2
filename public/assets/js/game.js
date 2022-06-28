<<<<<<< HEAD:public/assets/js/game.js
// import platform from '../public/assets/img/platform.js'
// console.log(platform)
=======
import platform from '../public/assets/img/platform.png'
>>>>>>> 02ab0fdd24c2dc208da94418ebcb0fba05db2e8d:src/game.js

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
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // to add velocity as player falls
        if (this.position.y + this.height + this.velocity.y 
            <= canvas.height )
        this.velocity.y += gravity;
        else this.velocity.y = 0;
    }
};

class Platform {
    constructor( {x, y} ) {
        this.position = {
            x: x,
            y: y
        } 
        this.width = 200;
        this.height = 20;

        // this.image
    }

    draw() {
        // c.drawImage(this.image, this.position.x, this.position.y)
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Npc {
    constructor() {
        this.position = {
            x: 200,
            y: 200
        };
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30;
        this.height = 50;
    }

    draw() {
        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    
}

const image = new Image();
// image.src = platform;

const player = new Player();
const platforms = [
    new Platform({
        x: 200, 
        y: 500,
        // image: ''
    
    }), new Platform({x: 100, y: 300})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },

}

let scrollOffset = 0;

// fuction to create a loop to create movement
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platforms.forEach(platform => {
        platform.draw()
    })
    

    // player movement
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 3;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -3;
    } else { 
        player.velocity.x = 0;

        if(keys.right.pressed) {
            scrollOffset += 3;
            platforms.forEach(platform => {
                platform.position.x -= 3;
            })
            
        } else if (keys.left.pressed) {
            scrollOffset -= 3;
            platforms.forEach(platform => {
                platform.position.x += 3;
            }) 
        } 

        if (scrollOffset > 2000) {
            console.log('you win')
        }
    };


    // Platform collision detection
    platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y && 
        player.position.y + player.height + player.velocity.y >= platform.position.y && 
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
    ) {
        player.velocity.y = 0;
    }
    }) 
};

animate();

// event listener for player movement
// 65 = 'a' key move left
// 87 = 'w' key move up
// 83 = 's' key move down
// 68 = 'd' key move right
// 32 = spacebar jump

window.addEventListener('keydown', ({ keyCode }) => {
    // console.log(keyCode)
    switch (keyCode) {
        case 65: 
            keys.left.pressed = true;
            break;
        case 87: 
            break;
        case 68: 
            keys.right.pressed = true;
            break;
        case 83: 
            break;
        case 32: 
            player.velocity.y -= 10;
            break;
    }
});

window.addEventListener('keyup', ({ keyCode }) => {
    // console.log(keyCode)
    switch (keyCode) {
        case 65: 
            console.log('left')
            keys.left.pressed = false;
            break;
        case 87: 
            console.log('up')
            break;
        case 68: 
            console.log('right')
            keys.right.pressed = false;
            break;
        case 83: 
            console.log('down')
            break;
        case 32: 
            console.log('jump')
            player.velocity.y -= 10; 
            break;
    }
});