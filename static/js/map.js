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

    // offset vars
    var offset_x = x;
    var offset_y = y;
    var fill_x = canvas.width;
    var fill_y = canvas.height;

    //draw black tint
    ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw box for map
    ctx.fillStyle = pattern;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(x - player.size - ctx.lineWidth, y - player.size - ctx.lineWidth, this.width + ((player.size + ctx.lineWidth)*2), this.height + ((player.size + ctx.lineWidth)*2));
    ctx.strokeStyle = "green";
    // offset
    ctx.translate(offset_x, offset_y);
    ctx.fill();
    ctx.stroke();
    // undo offset
    ctx.translate(-offset_x, -offset_y);
  }
}

var map = new Map();
