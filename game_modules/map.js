//map.js

class Map {
  constructor () {
    this.width = 700;
    this.height = 500;
  }

  update () {
    global.io.sockets.emit('map', global.map);
  }
}

module.exports = new Map();
