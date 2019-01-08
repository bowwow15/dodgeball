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

    ctx.fillStyle = player.color;
    //reset motion blur
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(x, y, player.size + 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(x, y, player.size, 0, 2 * Math.PI);
    ctx.fill();

    //draw crown if king
    if (player.king) {
      var crownImage = spriteList["playerCrown"].image;
      ctx.beginPath();
      ctx.drawImage(crownImage, 0, 0, crownImage.width, crownImage.height, x - 12.5, y - 25 - player.size, 25, 25);
    }

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
        ctx.fillText(player.username, x, y - player.size - 30);
    }

    ctx.globalAlpha = Game.motionBlur;
  }
}

var player = new Player();
