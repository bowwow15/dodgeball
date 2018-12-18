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
    ctx.rect(x, y, this.width + player.size, this.height + player.size);
    ctx.stroke();
  }
}

var map = new Map();
