//player.js

class PlayerModel {
  constructor (id) {
    this.id = id;

    this.x = 300;
    this.y = 300;

    this.speed = 5;

    this.color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
  }

  move (x, y, map) {
    //execute player move
    if (Math.abs(x) > this.speed || Math.abs(y) > this.speed) {
      console.log("Player " + this.id + " moved too fast.");
    } else {
      if (x > 0 && this.x <= map.width) this.x += x;
      if (x < 0 && this.x >= 0) this.x += x;
      if (y > 0 && this.y <= map.height) this.y += y;
      if (y < 0 && this.y >= 0) this.y += y;
    }
  }
}

class Player {
  constructor () {
    this.list = {};
  }

  new (socket) {
    this.list[socket.id] = new PlayerModel(socket.id);

    console.log("Player " + socket.id + " joined.");
  }
}

module.exports = new Player();
