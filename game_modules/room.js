class RoomModel {
  constructor (maxNumber) {
    this.occupants = 0;
    this.maxNumber = maxNumber;

    this.chat = [];

    this.obsticles = [];
    for (var i = 0; i < 45; i++) {
      this.obsticles.push({
        x: global.map.getRandomLocation().x,
        y: global.map.getRandomLocation().y,

        size: Math.floor(Math.random() * (25 - 5)) + 5
      });
    }
  }

  newPlayer () {
    this.occupants += 1;
  }
}

class Room {
  constructor () {
    this.maximumPlayers = 12;
    this.current = 0;

    this.list = {};
  }

  new () {
    var newRoom = new RoomModel(this.maximumPlayers);

    this.current += 1;
    this.list[this.current] = newRoom;
  }

  newPlayer () {
    if (this.list[this.current].occupants < this.list[this.current].maxNumber) {
      this.list[this.current].newPlayer();
    } else {
      this.new();
    }
  }

  getCurrent () {
    return this.current;
  }


  sendChat (player, text) {
    global.io.to('room_' + player.room).emit('chatFeed', {
      username: player.username,
      text: global.filter.clean(text)
    });

    console.log("" + player.username + ": " + text);
  }
}

module.exports = new Room();
