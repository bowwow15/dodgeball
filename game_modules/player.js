//player.js

class PlayerModel {
  constructor (socket, is_admin = false) {
    this.id = socket.id;
    this.socket = socket;

    this.alive = true;

    this.admin = is_admin;

    this.x = Math.floor(Math.random()*global.map.width);
    this.y = Math.floor(Math.random()*global.map.height);

    this.speed = 5;

    this.size = 15;

    this.score = 3;

    this.color = "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";

    //server-only values
    this.keyW = false;
    this.keyA = false;
    this.keyS = false;
    this.keyD = false;
  }

  move (x, y, map) {
    this.lastX = this.x;
    this.lastY = this.y;
    //execute player move
    if (Math.abs(x) > this.speed || Math.abs(y) > this.speed) {
      console.log("Player " + this.id + " moved too fast.");
    } else {
      if (this.admin) {
        this.x += x;
        this.y += y;
      } else {
        if (x > 0 && this.x <= map.width) this.x += x;
        if (x < 0 && this.x >= 0) this.x += x;
        if (y > 0 && this.y <= map.height) this.y += y;
        if (y < 0 && this.y >= 0) this.y += y;
      }
    }
  }

  triggerWhenPressed () {
    var movement = {x:0, y:0};

    if (this.keyW) {movement.y -= this.speed;}
    if (this.keyA) {movement.x -= this.speed;}
    if (this.keyS) {movement.y += this.speed;}
    if (this.keyD) {movement.x += this.speed;}

    this.move(movement.x, movement.y, global.map);
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

  die (id) {
    module.exports.list[id].socket.emit('dead');
    console.log("Player " + id + " died.");
    module.exports.die(id);
  }

  shoot (data) {
    if (this.score < 1) {
      this.die(this.id);
    }
    
    bullet.new(this, bullet.current_id, data.angle);
    this.score -= 1;
  }

  becomeAdmin () {
    console.log("Player " + this.id + " is admin.");
    this.admin = true;
  }

  modelForClient () { // values to pass to client
    return {
      x: this.x,
      y: this.y,
      score: this.score,
      color: this.color,
      size: this.size
    }
  }
}

class Player {
  constructor () {
    this.list = {};
  }

  die (id) {
    delete this.list[id];
  }

  new (socket) {
    this.list[socket.id] = new PlayerModel(socket);

    console.log("Player " + socket.id + " joined.");
  }
}

module.exports = new Player();
