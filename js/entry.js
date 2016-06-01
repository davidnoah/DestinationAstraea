var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var Game = require('./game.js');
var Spaceship = require('./spaceship.js');
var Moon = require('./moon.js');

function startGame() {
  var moon = new Moon(context);
  var spaceship = new Spaceship(context, moon);
  var game = new Game(canvas, context, spaceship, moon);

  game.draw();
}

startGame();
