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
	var Moon = __webpack_require__(2);
	
	var moon = new Moon(context);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Spaceship = function(context) {
	  this.context = context;
	  this.spaceship = {
	    color: "white",
	    width: 8,
	    height: 22,
	    position: {x: 20, y: 20},
	    velocity: {x: -1.2, y: 0},
	    angle: Math.PI / 2,
	    engineOn: false,
	    rotatingLeft: false,
	    rotatingRight: false,
	    crashed: false,
	    fuel: 1000
	  };
	};
	
	  Spaceship.prototype.drawSpaceship = function() {
	      var spaceship = this.spaceship;
	      var context = this.context;
	      if (spaceship.position.y >= 400) {
	        this.land();
	      } else {
	        context.save();
	        this.buildRect();
	      }
	
	      if(spaceship.engineOn) {
	        this.flameOn();
	      }
	      context.restore();
	  };
	
	  Spaceship.prototype.buildRect = function() {
	    var spaceship = this.spaceship;
	    var context = this.context;
	    context.beginPath();
	    context.translate(spaceship.position.x, spaceship.position.y);
	    context.rotate(spaceship.angle);
	    context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
	    context.fillStyle = spaceship.color;
	    context.fill();
	    context.closePath();
	  };
	
	  Spaceship.prototype.land = function() {
	    var spaceship = this.spaceship;
	    var context = this.context;
	    spaceship.position.y = 399.9;
	    spaceship.velocity.x -= 0.035;
	    spaceship.velocity.y = 0;
	    this.buildRect();
	  };
	
	  Spaceship.prototype.flameOn = function() {
	    var spaceship = this.spaceship;
	    var context = this.context;
	    spaceship.fuel -= 1;
	    context.beginPath();
	    context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
	    context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
	    context.lineTo(0, spaceship.height * 0.5 + Math.random() * 10);
	    context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
	    context.closePath();
	    context.fillStyle = "white";
	    context.fill();
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
	        spaceship.velocity.x += 0.0035 * Math.sin(-spaceship.angle);
	        spaceship.velocity.y += 0.0035 * Math.cos(spaceship.angle);
	    }
	    spaceship.velocity.y -= 0.0009;
	  };
	
	  module.exports = Spaceship;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Moon = function(context) {
	  this.context = context;
	  this.moon = {
	    landingPads: [],
	    moonStart: {x: 0, y: 400},
	    moonEnd: {x: 1000, y: 400},
	  };
	};
	
	Moon.prototype.drawMoon = function() {
	  var context = this.context;
	  var moon = this.moon;
	
	  context.save();
	  context.beginPath();
	  context.moveTo(moon.moonStart.x, moon.moonStart.y);
	  context.lineTo(moon.moonEnd.x, moon.moonEnd.y);
	  context.strokeStyle = "white";
	  context.stroke();
	  context.closePath();
	};
	
	module.exports = Moon;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map