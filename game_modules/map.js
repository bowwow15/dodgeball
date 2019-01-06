//map.js

class Map {
  constructor () {
    this.width = 2000;
    this.height = 2000;
  }

  update () {
    global.io.sockets.emit('map', global.map);
  }
}

module.exports = new Map();
