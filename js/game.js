var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var Spaceship = require('./spaceship.js');

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    Spaceship.updateSpaceship();
    Spaceship.drawSpaceship();
    requestAnimationFrame(draw);
}

draw();
