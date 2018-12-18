//player.js

class Player {
  constructor () {
    this.list = {};
  }

  new (socket) {
    this.list[socket.id] = {
      x: 300,
      y: 300
    };

    console.log("Player " + socket.id + " joined!");
  }

  move (data, socket) {
    var player = this.list[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  }
}

module.exports = new Player();
