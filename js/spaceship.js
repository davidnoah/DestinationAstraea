var Explosion = require('./explosion.js');
var explosion = new Explosion();

var Spaceship = function(context) {
  this.context = context;
  this.spaceship = {
    color: "white",
    width: 8,
    height: 22,
    position: {x: 20, y: 20},
    velocity: {x: -1.2, y: 0},
    angle: Math.PI / 2,
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false,
    crashed: false,
    fuel: 1000
  };
};

  Spaceship.prototype.drawSpaceship = function() {
      var spaceship = this.spaceship;
      var context = this.context;
      if (spaceship.position.y >= 400) {
        explosion.updateExplosion(10, context);
        this.explode();
        // this.land();
      } else {
        context.save();
        this.buildRect();
      }

      if(spaceship.engineOn) {
        this.flameOn();
      }
      context.restore();
  };

  Spaceship.prototype.explode = function() {
    var spaceship = this.spaceship;
    spaceship.position.y = 400;
    spaceship.velocity.x = 0;
    spaceship.velocity.y = 0;
    explosion.createExplosion(spaceship.position.x, spaceship.position.y, spaceship.color);
    explosion.createExplosion(spaceship.position.x, spaceship.position.y, "#E3701A");
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
    spaceship.position.y = 400;
    spaceship.velocity.x = 0;
    spaceship.velocity.y = 0;
    this.buildRect();
  };

  Spaceship.prototype.flameOn = function() {
    var spaceship = this.spaceship;
    var context = this.context;
    spaceship.fuel -= 1;
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
