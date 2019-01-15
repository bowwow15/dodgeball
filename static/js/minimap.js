class Minimap {
  constructor () {
    this.size = 120;

    this.minimapWidth = 0;
    this.minimapHeight = 0;
    this.minimapOrigin = {x:0,y:0};
  }

  draw () {
    //calculate ratio
    var xRatio = map.width / this.size;
    var yRatio = map.height / this.size;
    var xyRatio = (xRatio + yRatio) / 2;

    //box for minimap
    this.minimapWidth = map.width / xRatio;
    this.minimapHeight = map.height / yRatio;

    this.minimapOrigin = {
      x: canvas.width - this.minimapWidth,
      y: canvas.height - this.minimapHeight
    };

    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.beginPath();
    ctx.rect(this.minimapOrigin.x, this.minimapOrigin.y, this.minimapWidth, this.minimapHeight);
    ctx.fill();
    //draw obsticles
    var self = this;
    map.obsticles.forEach(function (element, index) {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(self.minimapOrigin.x + (element.x / xRatio), self.minimapOrigin.y + (element.y / yRatio), (element.size / xyRatio) + 1, 0, 2 * Math.PI);
      ctx.fill();
    });
    //draw player
    var myPlayer = player.list[socket.id];

    if (player.list[socket.id]) {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(this.minimapOrigin.x + (myPlayer.x / xRatio), this.minimapOrigin.y + (myPlayer.y / yRatio), (myPlayer.size / xyRatio) + 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

var minimap = new Minimap();
