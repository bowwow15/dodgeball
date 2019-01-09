class RoomModel {
  constructor (maxNumber) {
    this.occupants = 0;
    this.maxNumber = maxNumber;

    this.chat = [];
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
  }
}

module.exports = new Room();
