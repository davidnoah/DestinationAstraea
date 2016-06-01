var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var Spaceship = require('./spaceship.js');
var Moon = require('./moon.js');

var moon = new Moon(context);
var spaceship = new Spaceship(context, moon);

function draw() {
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
    context.beginPath();
    if (spaceship.spaceship.gameOver === true) {
      debugger;
      renderGameOver();
    }
    moon.drawMoon();
    drawFuel();
    spaceship.updateSpaceship();
    spaceship.drawSpaceship();
    requestAnimationFrame(draw);
}

function restartPlay() {
  cancelAnimationFrame(draw);
  draw();
}

function drawFuel() {
  context.beginPath();
  context.fillStyle = "rgb(224,224,224)";
  context.fillText("Fuel: " + spaceship.spaceship.fuel, 10, 10);
  context.closePath();
}

function renderGameOver() {
  context.beginPath();
  context.fillStyle = "rgb(224,224,224)";
  context.textAlign = "center";
  context.font = "30px Arial";
  context.fillText("Game Over! You Lose", 500, 200);
  context.closePath();
}

function keyLetGo(event) {
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
}
document.addEventListener('keyup', keyLetGo);

function keyPressed(event) {
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
}
document.addEventListener('keydown', keyPressed);

draw();
