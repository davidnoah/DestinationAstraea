var GameView = require("./gameView.js");
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var gameView = new GameView(context);

gameView.begin();
