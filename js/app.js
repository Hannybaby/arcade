// Draw objects on screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // When on top reset player
    if (this.y <= 0) {
        alert("⛥ Congrats! You won! ⛥ Click OK to play again!");
        this.reset();
    }
};

//Player start position
Object.prototype.reset = function() {
    player.x = 200;
    player.y = 385;
};


// Enemies the player must avoid
var allEnemies = [];
var Enemy = function(x, y) {


    this.sprite = 'images/enemy-bug.png';

    //x and y position, speed, dimensions
    this.x = x;
    this.y = y;
    this.width = 52;
    this.height = 55;
    this.speed = Math.floor((Math.random() * 200) + 100);
}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //if enemy is off map reset position.
    if (this.x <= 550) {
        this.x += this.speed * dt;
    } else {
        this.x = -2;
    }

    //Collision! 
    if (player.x >= this.x - 50 && player.x <= this.x + 50) {
        if (player.y >= this.y - 50 && player.y <= this.y + 50) {
            this.reset();
        }
    }
}




var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 385;
}


Player.prototype.update = function() {};


//Input handler for player
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 25) {
        this.x -= 100;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 82.5;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 82.5;
    }
};



// Create enemies and player

var enemy1 = new Enemy(-2, 60);
var enemy2 = new Enemy(-2, 150);
var enemy3 = new Enemy(-2, 230);

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);


var player = new Player();


// listens for key presses and sends the keys to 
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});