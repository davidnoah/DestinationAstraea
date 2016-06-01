var Game = function(canvas, context, spaceship, moon) {
  this.canvas = canvas;
  this.context = context;
  this.playing = false;
  this.moon = moon;
  this.spaceship = spaceship;

  document.addEventListener('keyup', this.keyLetGo.bind(this));
  document.addEventListener('keydown', this.keyPressed.bind(this));
};

Game.prototype.draw = function() {
    var context = this.context;
    var spaceship = this.spaceship;
    var moon = this.moon;
    context.beginPath();
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
    context.beginPath();
    if (spaceship.spaceship.gameOver === true) {
      this.renderGameOver();
    }
    moon.drawMoon();
    this.drawFuel();
    spaceship.updateSpaceship();
    spaceship.drawSpaceship();
    requestAnimationFrame(this.draw.bind(this));
};

Game.prototype.restartPlay = function() {
  cancelAnimationFrame(this.draw);
  this.draw();
};

Game.prototype.drawFuel = function() {
  var context = this.context;
  var spaceship = this.spaceship;
  context.beginPath();
  context.fillStyle = "rgb(224,224,224)";
  context.fillText("Fuel: " + spaceship.spaceship.fuel, 10, 10);
  context.closePath();
};

Game.prototype.renderGameOver = function() {
  var context = this.context;
  context.save();
  context.beginPath();
  context.fillStyle = "rgb(224,224,224)";
  context.textAlign = "center";
  context.font = "30px Arial";
  context.fillText("Game Over! You Lose", 500, 200);
  context.closePath();
};

Game.prototype.keyLetGo = function(event) {
  var spaceship = this.spaceship;
  switch(event.keyCode) {
      case 37:
          spaceship.spaceship.rotatingLeft = false;
          break;
      case 39:
          spaceship.spaceship.rotatingRight = false;
          break;
      case 38:
          spaceship.spaceship.engineOn = false;
          break;
  }
};

Game.prototype.keyPressed = function(event) {
  var spaceship = this.spaceship;
  switch(event.keyCode) {
      case 37:
          spaceship.spaceship.rotatingLeft = true;
          break;
      case 39:
          spaceship.spaceship.rotatingRight = true;
          break;
      case 38:
          spaceship.spaceship.engineOn = true;
          break;
    }
};

module.exports = Game;
