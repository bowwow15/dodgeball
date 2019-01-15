//map.js

class Map {
  constructor () {
    this.width = 2000;
    this.height = 2000;
  }

  update (room) {
    global.io.to('room_' + room).emit('map', {
      map: global.map,
      obsticles: global.room.list[room].obsticles
    });
  }

  getRandomLocation () {
    return {
      x: Math.floor(Math.random()*global.map.width),
      y: Math.floor(Math.random()*global.map.height)
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

  checkCollisionWithObsticles (x, y, size, movement, room) {
    x += movement.x;
    y += movement.y;

    var collision = false;
    var adjustedMovement = {x: 0, y: 0};

    var self = this;
    global.room.list[room].obsticles.forEach(function (element, index) {
      if (collision == false) {
        adjustedMovement = movement;

        if (self.collisionCheck(x, y, size, element.x, element.y, element.size)) {
          collision = true;
          adjustedMovement = {x: 0, y: 0};
        }
      }
    });

    return collision;
  }

}

module.exports = new Map();
