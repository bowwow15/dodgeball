class Bullet {
  constructor (player, angle, speed = 15, color = "black", room, id) {
    this.id = id;
    this.room = room;
    this.rotation = angle;
    this.speed = 40;
    this.color = color;

    if (player) {
      this.x = player.x;
      this.y = player.y;
      this.lastX = player.x;
      this.lastY = player.y;

      this.player_id = player.id;
      this.username = player.username;
    }

    this.size = 5;

    this.x_velocity = Math.cos(angle);
    this.y_velocity = Math.sin(angle);

    this.expire = Date.now() + 1000;
  }

  checkCollision (a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < a.radius + b.radius) {
        return true;
    } else {
      return false;
    }
  }

  collisionCheck (ax, ay, asize, bx, by, bsize) {
    var dx = ax - bx;
    var dy = ay - by;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < asize + bsize) {
      return true
    } else {
      return false;
    }
  }

  checkCollisionWithObsticles (x, y, size, movement) {
    x += movement.x;
    y += movement.y;

    var collision = false;
    var adjustedMovement = {x: 0, y: 0};

    var self = this;
    global.room.list[this.room].obsticles.forEach(function (element, index) {
      if (collision == false) {
        adjustedMovement = movement;

        if (self.collisionCheck(x, y, self.size, element.x, element.y, element.size)) {
          collision = true;
          adjustedMovement = {x: 0, y: 0};
        }
      }
    });

    return collision;
  }

  step () {
    if (Date.now() < this.expire) {
      this.lastX = this.x;
      this.lastY = this.y;
      this.x += this.x_velocity * this.speed;
      this.y += this.y_velocity * this.speed;

      //check player collision
      for (var id in global.player.list) {
        var player = global.player.list[id];
        let bool_collision = this.checkCollision({x: player.x, y: player.y, radius: player.size}, {x: this.x, y: this.y, radius: this.size});

        if (bool_collision) {
          if (id != this.player_id && global.player.list[id].admin == false) {
            if (global.player.list[id] && global.player.list[this.player_id]) {
              //add kills
              global.player.list[this.player_id].setScore(global.player.list[this.player_id].score + global.player.list[id].score + 1);
              global.player.list[this.player_id].socket.emit('textAlert', {
                text: "You hit " + global.player.list[id].username,
                room: global.player.list[this.player_id].room
              });
            }
            let killerUsername = null;
            global.player.list[id].die(id, this.username); //kill player, and send username of killer
          }
        }
      }
      //check obsticle collision
      if (this.checkCollisionWithObsticles(this.x, this.y, this.size, {x:0,y:0})) {
        delete module.exports.list[this.id];
      }
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  list: {},
  current_id: 0,
  new: function (player, id, angle, speed, color) {
    if (player) {
      var room = player.room;
      this.list[id] = new Bullet(player, angle, speed, color, room, id);
      this.current_id += 1;
    }
  },

  getList: function (room) {
    var bulletList = {};

    for (var id in this.list) {
      if (this.list[id].room == room) {
        bulletList[id] = this.list[id];
      }
    }

    return bulletList;
  }
};
