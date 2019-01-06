class Player {
  constructor () {
    this.list = {};

    this.size = 15;
  }

  draw (player, id) {
    if (id == socket.id) {
      view.centerOnPlayer();
    }

    let x = player.x + view.get().x;
    let y = player.y + view.get().y;
    let lastX = player.lastX + view.get().x;
    let lastY = player.lastY + view.get().y;

    ctx.lineWidth = 4;

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, player.size + 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(x, y, player.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

var player = new Player();
