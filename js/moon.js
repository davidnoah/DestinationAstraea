var Moon = function(context) {
  this.context = context;
  this.moon = {
    landingPads: [],
    moonStart: {x: 0, y: 400},
    coords: [
      [50, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      "landing",
      [150, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      [180, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      [225, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      "landing",
      [260, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      [275, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      "landing",
      [410, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      "landing",
      [460, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      "landing",
      [580, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      "landing",
      [640, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      "landing",
      [730, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      "landing",
      [770, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      [840, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      "landing",
      [920, Math.floor(Math.random() * (500 - 275 + 1)) + 275],
      "landing",
      [950, Math.floor(Math.random() * (500 - 275 + 1)) + 275]
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
