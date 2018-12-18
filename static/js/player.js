class Player {
  constructor () {
    this.list = {};

    this.speed = 5;
  }

  draw (x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 10, 10);
    ctx.fill();
  }
}

var player = new Player();
