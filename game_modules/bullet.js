class Bullet {
  constructor (player, angle, speed = 15) {
    this.rotation = angle;
    this.speed = 40;

    if (player) {
      this.x = player.x;
      this.y = player.y;
      this.lastX = player.x;
      this.lastY = player.y;

      this.player_id = player.id;
    }

    this.size = 5;

    this.x_velocity = Math.cos(angle);
    this.y_velocity = Math.sin(angle);

    this.expire = Date.now() + 1000;
  }

  checkCollision (a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
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
        if (this.lastX != this.x && this.lastY != this.y && this.checkCollision({x: player.x, y: player.y, width: player.width, height: player.height}, {x: this.x, y: this.y, width: this.size, height: this.size})) {
          if (id != this.player_id) {
            global.player.list[id].socket.emit('dead');
            console.log("Player " + id + " died.");
            delete global.player.list[id];
          }
        }
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
  new: function (player, id, angle) {
    if (player) {
      this.list[id] = new Bullet(player, angle);
      this.current_id += 1;
    }
  }
};
