class Map {
  constructor () {
    //default values to be overwritten
    this.width = 500;
    this.height = 500;

    this.obsticles = [];
  }

  update (data) {
    this.width = data.map.width;
    this.height = data.map.height;

    this.obsticles = data.obsticles;
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

    //draw obsticles
    this.obsticles.forEach(function (element, index) {
      let x = element.x + view.get().x,
          y = element.y + view.get().y,
          size = element.size;

      ctx.fillStyle = "grey";

      ctx.beginPath();
      ctx.arc(x, y, size + 3, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "white";

      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
}

var map = new Map();
