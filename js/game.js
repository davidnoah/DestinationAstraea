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
    spaceship.updateSpaceship();
    spaceship.drawSpaceship();
    moon.drawMoon();
    requestAnimationFrame(draw);
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
