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
/***/ function(module, exports, __webpack_require__) {

	var Explosion = __webpack_require__(3);
	var explosion = new Explosion();
	
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
	        explosion.updateExplosion(10, context);
	        this.explode();
	        // this.land();
	      } else {
	        context.save();
	        this.buildRect();
	      }
	
	      if(spaceship.engineOn) {
	        this.flameOn();
	      }
	      context.restore();
	  };
	
	  Spaceship.prototype.explode = function() {
	    var spaceship = this.spaceship;
	    spaceship.position.y = 400;
	    spaceship.velocity.x = 0;
	    spaceship.velocity.y = 0;
	    explosion.createExplosion(spaceship.position.x, spaceship.position.y, spaceship.color);
	    explosion.createExplosion(spaceship.position.x, spaceship.position.y, "#E3701A");
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
	    spaceship.position.y = 400;
	    spaceship.velocity.x = 0;
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Particle = __webpack_require__(4);
	var randomFloat = function(min, max) {
		return min + Math.random()*(max-min);
	};
	
	var Explosion = function() {
	  this.particles = [];
	};
	
	Explosion.prototype.createExplosion = function(x, y, color) {
		var minSize = 10;
		var maxSize = 30;
		var count = 10;
		var minSpeed = 60.0;
		var maxSpeed = 200.0;
		var minScaleSpeed = 1.0;
		var maxScaleSpeed = 4.0;
	
		for (var angle=0; angle<360; angle += Math.round(360/count))
		{
			var particle = new Particle();
	
			particle.x = x;
			particle.y = y;
	
			particle.radius = randomFloat(minSize, maxSize);
	
			particle.color = color;
	
			particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);
	
			var speed = randomFloat(minSpeed, maxSpeed);
	
			particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
			particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
	
			this.particles.push(particle);
		}
	};
	
	Explosion.prototype.updateExplosion = function(frameDelay, context) {
		for (var i=0; i < this.particles.length; i++) {
			var particle = this.particles[i];
	
			particle.updateParticle(frameDelay);
			particle.drawParticle(context);
		}
	};
	
	module.exports = Explosion;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Particle = function() {
		this.scale = 1.0;
		this.x = 0;
		this.y = 0;
		this.radius = 20;
		this.color = "white";
		this.velocityX = 0;
		this.velocityY = 0;
		this.scaleSpeed = 0.5;
	};
	
		Particle.prototype.updateParticle = function(ms) {
			this.scale -= this.scaleSpeed * ms / 1000.0;
			if (this.scale <= 0) {
				this.scale = 0;
			}
			this.x += this.velocityX * ms/1000.0;
			this.y += this.velocityY * ms/1000.0;
		};
	
		Particle.prototype.drawParticle = function(context) {
			context.save();
	
			context.beginPath();
	    context.translate(this.x, this.y);
	    context.scale(this.scale, this.scale);
			context.arc(0, 0, this.radius, 0, Math.PI*2, true);
	    context.fillStyle = this.color;
	    context.fill();
			context.closePath();
	
			context.restore();
		};
	
	
	module.exports = Particle;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map