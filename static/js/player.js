class Player {
  constructor () {
    this.list = {};

    this.speed = 5;
    this.size = 10;
  }

  draw (x, y, id) {
    if (id == socket.id) {
      view.centerOnPlayer();
    }

    x = x + view.get().x;
    y = y + view.get().y;

    ctx.beginPath();
    ctx.rect(x - 5, y - 5, 10, 10);
    ctx.fill();
  }
}

var player = new Player();
