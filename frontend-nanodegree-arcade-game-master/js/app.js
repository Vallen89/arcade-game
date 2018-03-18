// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Sets Enemies back to the left side, when they leave the screen
    this.x += this.speed * dt;
    if (this.x > 605) {
        this.x = -120;
        this.speed = 80 + Math.random() * 400;
    };
    // Collision with the Hero, sets the Hero back to starting Position
    if (player.x < this.x + 45 &&
        player.x + 35 > this.x &&
        player.y < this.y + 15 &&
        15 + player.y > this.y) {
        player.x = 200;
        player.y = 400;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Hero = function() {
    this.x = 202;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};
// This class requires an update(), render() and
// If the Player reaches the Water set him back to Starting position
// Place a Rock into the water to block one Path
Hero.prototype.update = function(dt) {
    if (player.y < 40 && bolder.x !== player.x) {
        player.x = 202;
        player.y = 400;
        bolder.x = Math.ceil(Math.random() * 5) * 101;
        bolder.y = -17;
    };
};

Hero.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
//movement of the Hero
Hero.prototype.handleInput = function(e) {
    if (this.x > 80 && e === "left") {
        this.x -= 101;
    } else if (this.y > 70 && e === "up") {
        this.y -= 82;
    } else if (e === "right" && this.x < 400) {
        this.x += 101;
    } else if (this.y < 399 && e === "down") {
        this.y += 82;
    }
};

//Rock Object to block one Path of the Player
var Rock = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/rock.png';
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//"Collision" witch the Rock sets player Back one Square
Rock.prototype.update = function() {
    if (player.x < this.x + 30 &&
        player.x + 30 > this.x &&
        player.y < this.y + 45 &&
        15 + player.y > this.y) {
        player.y = 72;
    }
};

// Now instantiate your objects.
var bugOne = new Enemy(-100, 60, 80 + Math.random() * 450);
var bugtwo = new Enemy(-100, 145, 80 + Math.random() * 450);
var bugthree = new Enemy(-100, 225, 80 + Math.random() * 450)
var bugfour = new Enemy(-350, 60, 80 + Math.random() * 450);
var bugfive = new Enemy(-350, 145, 80 + Math.random() * 450);
var bugsix = new Enemy(-350, 225, 80 + Math.random() * 450)
// Place all enemy objects in an array called allEnemies
var allEnemies = [bugOne, bugtwo, bugthree, bugfour, bugfive, bugsix];
// Place the player object in a variable called player
var player = new Hero;
//Rock placed outside the screen
var bolder = new Rock(-100, -100);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
