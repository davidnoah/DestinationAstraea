/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map