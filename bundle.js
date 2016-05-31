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
	var Moon = __webpack_require__(4);
	
	var moon = new Moon(context);
	var spaceship = new Spaceship(context, moon);
	
	function draw() {
	    context.beginPath();
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    context.fillStyle = "black";
	    context.fill();
	    context.closePath();
	    context.beginPath();
	
	
	    moon.drawMoon();
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
/***/ function(module, exports, __webpack_require__) {

	var Explosion = __webpack_require__(2);
	var explosion = new Explosion();
	var getCanvasPixelColor = __webpack_require__(5);
	
	var Spaceship = function(context, moon) {
	  this.context = context;
	  this.moon = moon;
	  this.spaceship = {
	    color: "white",
	    width: 4,
	    height: 11,
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
	      var color = getCanvasPixelColor(context, spaceship.position.x, spaceship.position.y);
	      if (color.rgb === "rgb(255,255,255)") {
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
/***/ function(module, exports, __webpack_require__) {

	var Particle = __webpack_require__(3);
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
/* 3 */
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Moon = function(context) {
	  this.context = context;
	  this.moon = {
	    landingPads: [],
	    moonStart: {x: 0, y: 400},
	    coords: [
	      [50, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [150, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      [225, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [275, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [410, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [460, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [580, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      [640, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [730, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [770, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      [840, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [920, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [950, Math.floor(Math.random() * (600 - 300 + 1)) + 300]
	    ],
	    moonEnd: {x: 1000, y: 400},
	    moonDrawn: false
	  };
	};
	
	Moon.prototype.drawMoon = function() {
	  var context = this.context;
	  var moon = this.moon;
	
	  context.save();
	  context.beginPath();
	  context.moveTo(moon.moonStart.x, moon.moonStart.y);
	  for (var i = 0; i < this.moon.coords.length; i++) {
	    if (this.moon.coords[i] !== "landing") {
	      context.lineTo(this.moon.coords[i][0], this.moon.coords[i][1]);
	    }
	    if (this.moon.coords[i + 1] === "landing") {
	      context.strokeStyle = "rgb(255,255,255)";
	      context.lineWidth = 2;
	      context.stroke();
	      this.drawLandingZone([this.moon.coords[i][0] + 15, this.moon.coords[i][1]]);
	    }
	  }
	  context.lineTo(moon.moonEnd.x, moon.moonEnd.y);
	  context.lineWidth = 2;
	  context.strokeStyle = "rgb(255,255,255)";
	  context.stroke();
	  context.closePath();
	};
	
	Moon.prototype.drawLandingZone = function(endCoord) {
	  var context = this.context;
	  context.beginPath();
	  context.moveTo(endCoord[0] - 15, endCoord[1]);
	  context.lineTo(endCoord[0], endCoord[1]);
	  context.strokeStyle = "rgb(255,0,0)";
	  context.lineWidth = 2;
	  context.stroke();
	  context.beginPath();
	  context.moveTo(endCoord[0], endCoord[1]);
	};
	
	module.exports = Moon;


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * getCanvasPixelColor
	 * @param  {canvas element|context} ctx  The canvas from which to take the color
	 * @param  {int} x                       The x coordinate of the pixel to read
	 * @param  {int} y                       The y coordinate of the pixel to read
	 * @return {array/object}                The rgb values of the read pixel
	 */
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	exports['default'] = function (ctx, x, y) {
		// if it's not a context, it's probably a canvas element
		if (!ctx.getImageData) {
			ctx = ctx.getContext('2d');
		}
	
		// extract the pixel data from the canvas
		var pixel = ctx.getImageData(x, y, 1, 1).data;
	
		// set each color property
		pixel.r = pixel[0];
		pixel.b = pixel[1];
		pixel.g = pixel[2];
		pixel.a = pixel[3];
	
		// convenience CSS strings
		pixel.rgb = 'rgb(' + pixel.r + ',' + pixel.g + ',' + pixel.b + ')';
		pixel.rgba = 'rgb(' + pixel.r + ',' + pixel.g + ',' + pixel.b + ',' + pixel.a + ')';
	
		return pixel;
	};
	
	module.exports = exports['default'];
	


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map