var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var Game = require('./game.js');


function startGame() {
  var game = new Game(canvas, context);

  game.draw();
}

startGame();
