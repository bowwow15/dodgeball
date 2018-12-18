class View {
  constructor () {
    this.x = 0;
    this.y = 0;
  }

  move (x, y) {
    this.x += x;
    this.y += y;
  }

  set (x, y) {
    this.x = x;
    this.y = y;
  }

  centerOnPlayer () {
    var myPlayer = player.list[socket.id];

    if (myPlayer) {
      this.set(myPlayer.x - (canvas.width/2), myPlayer.y - (canvas.height/2));
    }
  }

  get () {
    return {
      x: -this.x,
      y: -this.y
    }
  }
}

var view = new View();
