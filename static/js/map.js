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

    // draw background
    var pattern = ctx.createPattern(spriteList["hexPatternImg"].image, 'repeat');
    ctx.fillStyle = pattern;

    // offset vars
    var offset_x = x;
    var offset_y = y;
    var fill_x = canvas.width;
    var fill_y = canvas.height;

    // offset
    ctx.translate(offset_x, offset_y);

    // draw
    ctx.fillRect(-offset_x, -offset_y, fill_x, fill_y);

    // undo offset
    ctx.translate(-offset_x, -offset_y);

    //draw box for map
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(x - player.size - ctx.lineWidth, y - player.size - ctx.lineWidth, this.width + ((player.size + ctx.lineWidth)*2), this.height + ((player.size + ctx.lineWidth)*2));
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
  }
}

var map = new Map();
