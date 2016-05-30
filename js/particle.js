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
