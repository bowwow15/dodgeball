class Map {
  constructor () {
    //default values to be overwritten
    this.width = 500;
    this.height = 500;
  }

  update (map) {
    this.width = map.width;
    this.height = map.height;
  }

  draw () {
    let x = view.get().x;
    let y = view.get().y;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(x - player.size - ctx.lineWidth, y - player.size - ctx.lineWidth, this.width + ((player.size + ctx.lineWidth)*2), this.height + ((player.size + ctx.lineWidth)*2));
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fill();
  }
}

var map = new Map();
