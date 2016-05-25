var Moon = function(context) {
  this.context = context;
  this.moon = {
    landingPads: [],
    moonStart: {x: 0, y: 400},
    moonEnd: {x: 1000, y: 400}
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
