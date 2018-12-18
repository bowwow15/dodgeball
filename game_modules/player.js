//player.js

class PlayerModel {
  constructor () {
    this.x = 300;
    this.y = 300;

    this.color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
  }

  move (x, y, map) {
    //execute player move
    if (x > 0 && this.x <= map.width) this.x += x;
    if (x < 0 && this.x >= 0) this.x += x;
    if (y > 0 && this.y <= map.height) this.y += y;
    if (y < 0 && this.y >= 0) this.y += y;
  }
}

class Player {
  constructor () {
    this.list = {};
  }

  new (socket) {
    this.list[socket.id] = new PlayerModel();

    console.log("Player " + socket.id + " joined.");
  }
}

module.exports = new Player();
