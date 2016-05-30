var Particle = require('./particle.js');
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
