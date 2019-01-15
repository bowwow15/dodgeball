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
}

module.exports = new Map();
