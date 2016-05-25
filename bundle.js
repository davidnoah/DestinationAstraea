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
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById("game");
	var context = canvas.getContext("2d");
	
	var Spaceship = __webpack_require__(1);
	var spaceship = new Spaceship(context);
	
	function draw() {
	    context.beginPath();
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    context.fillStyle = "black";
	    context.fill();
	    context.closePath();
	
	    context.beginPath();
	    spaceship.updateSpaceship();
	    spaceship.drawSpaceship();
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Spaceship = function(context) {
	  this.context = context;
	  this.spaceship = {
	    color: "red",
	    width: 8,
	    height: 22,
	    position: {x: 20, y: 20},
	    velocity: {x: -0.7, y: 0},
	    angle: Math.PI / 2,
	    engineOn: false,
	    rotatingLeft: false,
	    rotatingRight: false,
	    crashed: false,
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
	          this.context.beginPath();
	          this.context.moveTo(this.spaceship.width * -0.5, this.spaceship.height * 0.5);
	          this.context.lineTo(this.spaceship.width * 0.5, this.spaceship.height * 0.5);
	          this.context.lineTo(0, this.spaceship.height * 0.5 + Math.random() * 10);
	          this.context.lineTo(this.spaceship.width * -0.5, this.spaceship.height * 0.5);
	          this.context.closePath();
	          this.context.fillStyle = "orange";
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map