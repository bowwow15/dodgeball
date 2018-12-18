class Player {
  constructor () {
    this.list = {};

    this.speed = 5;
    this.size = 10;
  }

  draw (player, id) {
    if (id == socket.id) {
      view.centerOnPlayer();
    }

    let x = player.x + view.get().x;
    let y = player.y + view.get().y;

    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.rect(x - 5, y - 5, 10, 10);
    ctx.fill();
  }
}

var player = new Player();
