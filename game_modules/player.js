//player.js

class PlayerModel {
  constructor () {
    this.x = 300;
    this.y = 300;
  }

  move (x, y) {
    this.x += x;
    this.y += y;
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
