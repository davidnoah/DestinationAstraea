var Game = function(context, spaceship, moon) {
  this.context = context;
  this.playing = false;
  this.moon = moon;
  this.spaceship = spaceship;
};

Game.prototype.draw = function() {
    var context = this.context;
    var spaceship = this.spaceship;
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
    context.beginPath();
    if (spaceship.spaceship.gameOver === true) {
      renderGameOver();
    }
    moon.drawMoon();
    drawFuel();
    spaceship.updateSpaceship();
    spaceship.drawSpaceship();
    requestAnimationFrame(draw);
};

Game.prototype.restartPlay = function() {
  cancelAnimationFrame(draw);
  draw();
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
  context.beginPath();
  context.fillStyle = "rgb(224,224,224)";
  context.textAlign = "center";
  context.font = "30px Arial";
  context.fillText("Game Over! You Lose", 500, 200);
  context.closePath();
};

module.exports = Game;
