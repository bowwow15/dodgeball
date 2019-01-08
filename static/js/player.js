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

    ctx.lineWidth = 4;

    if (player.color == "green") {
      ctx.fillStyle = "black";
    } else {
      ctx.fillStyle = "white";
    }
    //reset motion blur
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(x, y, player.size + 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(x, y, player.size, 0, 2 * Math.PI);
    ctx.fill();

    //draw kills
    ctx.beginPath();
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.fillText(player.score.toString(), x, y + 5);

    //draw username if mouse over
    var dx = x - Mouse.x;
    var dy = y - Mouse.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.size + 1) {
        //draw username
        ctx.font = "25px Arial";
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.fillText(player.username, x, y - player.size - 10);
    }

    ctx.globalAlpha = Game.motionBlur;
  }
}

var player = new Player();
