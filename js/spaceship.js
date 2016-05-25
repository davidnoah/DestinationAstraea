var Spaceship = function(context) {
  this.context = context;
  this.spaceship = {
    color: "white",
    width: 8,
    height: 22,
    position: {x: 20, y: 20},
    velocity: {x: -0.7, y: 0},
    angle: Math.PI / 2,
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false,
    crashed: false,
    fuel: 1000
  };
};

  Spaceship.prototype.drawSpaceship = function() {
      this.context.save();
      this.context.beginPath();
      this.context.translate(this.spaceship.position.x, this.spaceship.position.y);
      this.context.rotate(this.spaceship.angle);
      this.context.rect(this.spaceship.width * -0.5, this.spaceship.height * -0.5, this.spaceship.width, this.spaceship.height);
      this.context.fillStyle = this.spaceship.color;
      this.context.fill();
      this.context.closePath();

      if(this.spaceship.engineOn) {
          this.spaceship.fuel -= 1;
          this.context.beginPath();
          this.context.moveTo(this.spaceship.width * -0.5, this.spaceship.height * 0.5);
          this.context.lineTo(this.spaceship.width * 0.5, this.spaceship.height * 0.5);
          this.context.lineTo(0, this.spaceship.height * 0.5 + Math.random() * 10);
          this.context.lineTo(this.spaceship.width * -0.5, this.spaceship.height * 0.5);
          this.context.closePath();
          this.context.fillStyle = "white";
          this.context.fill();
      }
      this.context.restore();
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
        spaceship.velocity.x += 0.008 * Math.sin(-spaceship.angle);
        spaceship.velocity.y += 0.008 * Math.cos(spaceship.angle);
    }
    spaceship.velocity.y -= 0.004;
  };

  module.exports = Spaceship;
