var Explosion = require('./explosion.js');
var explosion = new Explosion();
var getCanvasPixelColor = require('get-canvas-pixel-color');

var Spaceship = function(context, moon) {
  this.context = context;
  this.moon = moon;
  this.spaceship = {
    color: "white",
    width: 4,
    height: 11,
    position: {x: 20, y: 20},
    velocity: {x: -1.2, y: 0},
    angle: Math.PI / 2,
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false,
    gameOver: false,
    won: false,
    fuel: 800
  };
};

Spaceship.prototype.drawSpaceship = function() {
    var spaceship = this.spaceship;
    var context = this.context;
    var color = getCanvasPixelColor(context, spaceship.position.x, spaceship.position.y);
    if (spaceship.fuel <= 0) {
      explosion.updateExplosion(10, context);
      this.explode();
    } else if (color.rgb === "rgb(255,255,255)") {
      explosion.updateExplosion(10, context);
      this.explode();
    } else if (color.rgb === "rgb(254,254,254)") {
      if (this.checkSpeed()) {
        this.land();
      } else {
        explosion.updateExplosion(10, context);
        this.explode();
      }
    } else {
      context.save();
      this.buildRect();
    }

    if(spaceship.engineOn) {
      this.flameOn();
    }
    context.restore();
};

Spaceship.prototype.checkSpeed = function() {
  var spaceship = this.spaceship;
  if (Math.round(spaceship.velocity.y * 100) <= 20 && Math.round(spaceship.velocity.x * 100) <= 20 &&
      Math.round(spaceship.velocity.y >= -20) && Math.round(spaceship.velocity.x * 100) >= -20) {
    return true;
  } else {
    return false;
  }
};

Spaceship.prototype.explode = function() {
  var spaceship = this.spaceship;
  spaceship.gameOver = true;
  spaceship.velocity.x = 0;
  spaceship.velocity.y = 0;
  explosion.createExplosion(spaceship.position.x, spaceship.position.y, spaceship.color);
  explosion.createExplosion(spaceship.position.x, spaceship.position.y, spaceship.color);
};

Spaceship.prototype.buildRect = function() {
  var spaceship = this.spaceship;
  var context = this.context;
  context.beginPath();
  context.translate(spaceship.position.x, spaceship.position.y);
  context.rotate(spaceship.angle);
  context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
  context.fillStyle = spaceship.color;
  context.fill();
  context.closePath();
};

Spaceship.prototype.land = function() {
  var spaceship = this.spaceship;
  spaceship.velocity.x = 0;
  spaceship.velocity.y = 0;
  spaceship.angle = 2 * Math.PI;
  spaceship.gameOver = true;
  this.buildRect();
};

Spaceship.prototype.flameOn = function() {
  var spaceship = this.spaceship;
  var context = this.context;
  if (spaceship.fuel > 0) {
    spaceship.fuel -= 1;
  }
  context.beginPath();
  context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
  context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
  context.lineTo(0, spaceship.height * 0.5 + Math.random() * 10);
  context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
  context.closePath();
  context.fillStyle = "white";
  context.fill();
};

Spaceship.prototype.updateSpaceship = function() {
  var spaceship = this.spaceship;
  spaceship.position.x -= spaceship.velocity.x;
  spaceship.position.y -= spaceship.velocity.y;

  if (spaceship.rotatingRight) {
      spaceship.angle += Math.PI / 180 + 0.02;
  } else if (spaceship.rotatingLeft) {
      spaceship.angle -= Math.PI / 180 + 0.02;
  }

  if (spaceship.engineOn) {
      spaceship.velocity.x += 0.0035 * Math.sin(-spaceship.angle);
      spaceship.velocity.y += 0.0035 * Math.cos(spaceship.angle);
  }
  spaceship.velocity.y -= 0.0009;
};

  module.exports = Spaceship;
