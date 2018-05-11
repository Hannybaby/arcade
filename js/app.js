// Enemies our player must avoid 
var InGameObjects = function (x, y) {
	this.start = 0;
	this.end = 500;	
	this.x = 0;
	this.y = 0;
	this.sprite;
}




var allEnemies = [];

var Enemy = function(x, y) {
    InGameObjects.call(this, Enemy);
    
    this.sprite = 'images/enemy-bug.png';
    this.width = 52;
	this.height = 55;	
};

Enemy.prototype = Object.create(InGameObjects.prototype);
Enemy.prototype.constructor = Enemy;

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.y = 60;
	
	for (var i = 0; i < allEnemies.length; i++) {
		allEnemies[i].start = (Math.floor(Math.random() * (-2000)) + 2);
		// bugs speed
		allEnemies[i].x += (50 * dt); 
		// bugs y-position
		allEnemies[i].y = allEnemies[i].y + 80; 
  }

		 this.checkCollisions();

		//stay inside map (y)
		if (allEnemies[i].y > 220) {
			allEnemies[i].y = 60;
		}

		//stay inside map (x)
		if (allEnemies[i].x >= this.end) {
			allEnemies[i].x = allEnemies[i].start;
		}
	}
	
};

    


// Draw the enemy on the screen
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
	if (player.x < this.x + this.width &&
   player.x + player.width > this.x &&
   player.y < this.y + this.height &&
   player.height + player.y > this.y) {
    // collision detected!
   player.x = 305;
   player.y = 400;
 }	
};

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);


var Player = function() {
	InGameObjects.call(this, Player);
	//start position player
	this.x = 200; 
	this.y = 385;

	// player dimensions
	this.width = 52;
	this.height = 55;

	this.sprite = 'images/char-princess-girl.png';
}

Player.prototype = Object.create(InGameObjects);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

Player.prototype.handleInput = function(direction) { 
	  if (direction === 'left' && this.x > 25) {
		this.x -= 100;
	} if (direction === 'right' && this.x < 400) {
		this.x += 100;
	} if (direction === 'up' && this.y > 0) {
		this.y -= 82.5;
	} if (direction === 'down' && this.y < 400) {
		this.y += 82.5;
	}
};


// Now instantiate your objects.
var player = new Player();


// This listens for key presses and sends the keys to your
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
