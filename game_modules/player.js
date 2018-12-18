//player.js

class PlayerModel {
  constructor (id) {
    this.id = id;

    this.x = 300;
    this.y = 300;

    this.speed = 5;

    this.color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";

    //server-only values
    this.keyW = false;
    this.keyA = false;
    this.keyS = false;
    this.keyD = false;
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

  triggerWhenPressed (map) {
    var movement = {x:0, y:0};

    if (this.keyW) {movement.y -= this.speed;}
    if (this.keyA) {movement.x -= this.speed;}
    if (this.keyS) {movement.y += this.speed;}
    if (this.keyD) {movement.x += this.speed;}

    this.move(movement.x, movement.y, map);
  }

  keyEvent (keyCode, bool) {
    switch (keyCode) {
      case 87: //up
      this.keyW = bool;
      break;
      case 83: //down
      this.keyS = bool;
      break;
      case 65: //left
      this.keyA = bool;
      break;
      case 68: //right
      this.keyD = bool;
      break;
    }
  }

  modelForClient () { // values to pass to client
    return {
      x: this.x,
      y: this.y,
      color: this.color
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
