//player.js

class PlayerModel {
  constructor (socket, username, room) {
    this.id = socket.id;
    this.socket = socket;

    this.room = room;

    this.username = username;

    this.alive = true;
    this.king = false;
    this.admin = false;

    this.x = Math.floor(Math.random()*global.map.width);
    this.y = Math.floor(Math.random()*global.map.height);

    this.speed = 7;

    this.size = 17;

    this.score = 5;

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

  die (id, killer) {
    if (!module.exports.list[id].admin) {
      global.room.list[module.exports.list[id].room].occupants -= 1; //remove from room

      module.exports.list[id].socket.emit('dead', {killer: killer}); //emit to client
      console.log("Player " + id + " died."); //console
      module.exports.die(id); //delete from list
    }
  }

  shoot (data) {
    if (this.score < 1) {
      this.die(this.id, null);
    }

    bullet.new(this, bullet.current_id, data.angle, 15, this.color);
    this.setScore(this.score - 1);
  }

  becomeAdmin () {
    console.log("Player " + this.id + " is admin.");
    this.admin = true;
  }

  modelForClient () { // values to pass to client
    return {
      username: this.username,
      king: this.king,
      x: this.x,
      y: this.y,
      score: this.score,
      color: this.color,
      size: this.size
    }
  }

  setScore (amount) {
    this.score = amount;
    this.size = (this.score * 3) + 3;

    //determine the king
    module.exports.findKing(this.room);
  }
}

class Player {
  constructor () {
    this.list = {};
  }

  die (id) {
    if (this.list[id]) {
      var room = this.list[id].room;
      delete this.list[id];
      this.findKing(room);
    }
  }

  new (socket, username) {
    global.room.newPlayer(); //lets room controller know when to create new room
    let room = global.room.getCurrent();
    this.list[socket.id] = new PlayerModel(socket, username, room);

    console.log("Player " + socket.id + ", AKA " + username + " joined.");

    this.findKing(room); //find out if this player is king
  }

  updateLeaderboard (room) {
    var leaderboard = {};
    var unordered = []; //set empty lists
    var self = this;

    for (var id in this.list) { //fill in unordered list
      if (self.list[id]) {
        if (self.list[id].room == room) { // if player is in same room
          unordered.push({
            username: self.list[id].username,
            score: self.list[id].score
          });
        }
      }
    }

    unordered.sort(function(a, b) {
        return b.score - a.score;
    }); //descending
    var ordered = unordered;

    global.io.to('room_' + room).emit('leaderboard', {ordered: ordered});
  }

  findKing (room) {
    var king = null;
    for (var id in this.list) {
      //set all in same room to false
      if (this.list[id].room == room) {
        this.list[id].king = false;
      }
      var indexedPlayer = this.list[id];
      //find highest score
      if (indexedPlayer.room == room) {
        if (king != null) {
          if (indexedPlayer.score > king.score) {
            king = indexedPlayer;
          }
        } else {
          king = indexedPlayer;
        }
      }
    }
    if (king != null) {
      this.list[king.id].king = true; //set king property of found king
    }

    this.updateLeaderboard(room);
  }


  getStateForClient (room) {
    var augmentedPlayerList = {};

    for (var id in this.list) {
      var current_player = this.list[id];
      if (current_player.room == room) {
        augmentedPlayerList[id] = current_player.modelForClient();
      }
    } // get player properties for client

    return augmentedPlayerList;
  }
}

module.exports = new Player();
