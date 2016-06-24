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
	var Game = __webpack_require__(1);
	
	
	function startGame() {
	  var game = new Game(canvas, context);
	
	  game.draw();
	}
	
	startGame();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Spaceship = __webpack_require__(2);
	var Moon = __webpack_require__(6);
	
	var Game = function(canvas, context) {
	  this.canvas = canvas;
	  this.context = context;
	  this.playing = false;
	  this.moon = new Moon(context);
	  this.spaceship = new Spaceship(context, this.moon);
	
	  document.addEventListener('keyup', this.keyLetGo.bind(this));
	  document.addEventListener('keydown', this.keyPressed.bind(this));
	  document.getElementById('game').addEventListener("click", this.startPlaying.bind(this));
	};
	
	Game.prototype.draw = function() {
	    var context = this.context;
	    var spaceship = this.spaceship;
	    var moon = this.moon;
	      context.beginPath();
	      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      context.fillStyle = "black";
	      context.fill();
	      context.closePath();
	
	    if (this.playing === true) {
	      context.beginPath();
	      if (spaceship.spaceship.gameOver) {
	        if (spaceship.spaceship.won) {
	          this.renderGameOverWon();
	        } else {
	          this.renderGameOverLoss();
	        }
	      }
	      moon.drawMoon();
	      spaceship.updateSpaceship();
	      spaceship.drawSpaceship();
	      this.drawFuel();
	      this.drawVelocity();
	    } else {
	      this.displayIntro();
	    }
	
	    requestAnimationFrame(this.draw.bind(this));
	};
	
	Game.prototype.startPlaying = function() {
	  this.playing = true;
	};
	
	Game.prototype.displayIntro = function() {
	  var context = this.context;
	  var spaceship = this.spaceship;
	  context.beginPath();
	  context.fillStyle = "rgb(224,224,224)";
	  context.textAlign = "center";
	  context.font = "15px Quicksand";
	  context.fillText("click to begin your decent", this.canvas.width / 2, 240);
	  context.closePath();
	};
	
	Game.prototype.restartPlay = function() {
	  var context = this.context;
	  this.moon = new Moon(context);
	  this.spaceship = new Spaceship(context, this.moon);
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  this.draw();
	};
	
	Game.prototype.drawFuel = function() {
	  var context = this.context;
	  var spaceship = this.spaceship;
	  context.beginPath();
	  context.fillStyle = "rgb(224,224,224)";
	  context.font = "10px Quicksand";
	  context.textAlign = 'left';
	  context.fillText("Fuel: " + spaceship.spaceship.fuel, 5, 10);
	  context.closePath();
	};
	
	Game.prototype.drawVelocity = function() {
	  var context = this.context;
	  var spaceship = this.spaceship;
	  context.beginPath();
	  context.fillStyle = "rgb(224,224,224)";
	  context.font = "10px Quicksand";
	  context.textAlign = "left";
	  context.fillText("Velocity Y: " + Math.abs(Math.round(spaceship.spaceship.velocity.y * 100)), 5, 25);
	  context.fillText("Velocity X: " + Math.abs(Math.round(spaceship.spaceship.velocity.x * 100)), 5, 40);
	  context.closePath();
	};
	
	Game.prototype.renderGameOverLoss = function() {
	  var context = this.context;
	  context.save();
	  context.beginPath();
	  context.fillStyle = "rgb(224,224,224)";
	  context.textAlign = "center";
	  context.font = "20px Quicksand";
	  context.fillText("Game Over! You Lose", this.canvas.width / 2, 200);
	  context.font = "15px Quicksand";
	  context.fillText("Click to Play Again", this.canvas.width / 2, 230);
	  context.closePath();
	
	  document.getElementById('game').removeEventListener("click", this.startPlaying.bind(this));
	  document.getElementById('game').addEventListener("click", this.restartPlay.bind(this));
	};
	
	Game.prototype.renderGameOverWon = function() {
	  var context = this.context;
	  context.save();
	  context.beginPath();
	  context.fillStyle = "rgb(224,224,224)";
	  context.textAlign = "center";
	  context.font = "20px Quicksand";
	  context.fillText("Great Landing! You Win.", this.canvas.width / 2, 200);
	  context.font = "15px Quicksand";
	  context.fillText("Click to Play Again", this.canvas.width / 2, 230);
	  context.closePath();
	
	  document.getElementById('game').removeEventListener("click", this.startPlaying.bind(this));
	  document.getElementById('game').addEventListener("click", this.restartPlay.bind(this));
	};
	
	Game.prototype.keyLetGo = function(event) {
	  var spaceship = this.spaceship;
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
	};
	
	Game.prototype.keyPressed = function(event) {
	  var spaceship = this.spaceship;
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
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Explosion = __webpack_require__(3);
	var getCanvasPixelColor = __webpack_require__(5);
	
	var Spaceship = function(context, moon) {
	  this.context = context;
	  this.moon = moon;
	  this.explosion = new Explosion();
	  this.spaceship = {
	    color: "white",
	    width: 4,
	    height: 11,
	    position: {x: 100, y: 20},
	    velocity: {x: -1.2, y: 0},
	    angle: Math.PI / 2,
	    engineOn: false,
	    rotatingLeft: false,
	    rotatingRight: false,
	    gameOver: false,
	    won: false,
	    exploding: false,
	    fuel: 800
	  };
	};
	
	Spaceship.prototype.drawSpaceship = function() {
	    var spaceship = this.spaceship;
	    var context = this.context;
	    var color = getCanvasPixelColor(context, spaceship.position.x, spaceship.position.y);
	    if (spaceship.exploding) {
	      this.explosion.updateExplosion(10, context);
	      this.explode();
	    } else {
	      if (spaceship.fuel <= 0) {
	        this.explosion.updateExplosion(10, context);
	        this.explode();
	      } else if (color.rgb === "rgb(255,255,255)") {
	        this.explosion.updateExplosion(10, context);
	        this.explode();
	      } else if (color.rgb === "rgb(254,254,254)") {
	        if (this.checkSpeed()) {
	          this.land();
	        } else {
	          this.explosion.updateExplosion(10, context);
	          this.explode();
	        }
	      } else {
	        context.save();
	        this.buildRect();
	      }
	    }
	
	    if(spaceship.engineOn) {
	      this.flameOn();
	    }
	    context.restore();
	};
	
	Spaceship.prototype.checkSpeed = function() {
	  var spaceship = this.spaceship;
	  debugger;
	  if (Math.round(spaceship.velocity.y * 100) <= 20 && Math.round(spaceship.velocity.x * 100) <= 20 &&
	      Math.round(spaceship.velocity.y >= -20) && Math.round(spaceship.velocity.x * 100) >= -20) {
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Spaceship.prototype.explode = function() {
	  var spaceship = this.spaceship;
	  spaceship.gameOver = true;
	  spaceship.exploding = true;
	  spaceship.velocity.x = 0;
	  spaceship.velocity.y = 0;
	  this.explosion.createExplosion(spaceship.position.x, spaceship.position.y, spaceship.color);
	  this.explosion.createExplosion(spaceship.position.x, spaceship.position.y, spaceship.color);
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
	  spaceship.velocity.x = 0;
	  spaceship.velocity.y = 0;
	  spaceship.angle = 2 * Math.PI;
	  spaceship.gameOver = true;
	  spaceship.won = true;
	  this.buildRect();
	};
	
	Spaceship.prototype.flameOn = function() {
	  var spaceship = this.spaceship;
	  var context = this.context;
	  if (spaceship.fuel > 0) {
	    spaceship.fuel -= 1;
	  }
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
	
		for (var angle=0; angle<360; angle += Math.round(360/count)) {
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
		this.garbageCollectParticles();
		for (var i=0; i < this.particles.length; i++) {
			var particle = this.particles[i];
			particle.updateParticle(frameDelay);
			particle.drawParticle(context);
		}
	};
	
	Explosion.prototype.garbageCollectParticles = function() {
		var stillAlive = [];
		this.particles.forEach(function(particle) {
			if (particle.scale !== 0) {
				stillAlive.push(particle);
			}
		});
		this.particles = stillAlive;
	};
	
	module.exports = Explosion;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Particle = function() {
		this.scale = 0.5;
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
	


/***/ },
/* 6 */
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
	      [180, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      [225, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [260, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      [275, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [410, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [460, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
	      [580, Math.floor(Math.random() * (600 - 300 + 1)) + 300],
	      "landing",
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
	  context.strokeStyle = "rgb(254,254,254)";
	  context.lineWidth = 2;
	  context.stroke();
	  context.beginPath();
	  context.moveTo(endCoord[0], endCoord[1]);
	};
	
	module.exports = Moon;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map