class Room {
  constructor () {

  }

  drawNumber (number) {
    ctx.textAlign = "right";
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";

    ctx.beginPath();
    ctx.fillText("Room " + number.toString(), canvas.width - 15, 25);
  }
}

var room = new Room();
