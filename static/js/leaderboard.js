class Leaderboard {
  constructor () {
    this.x = 15;
    this.y = 25;

    this.orderedList = [];
  }

  update (data) {
    this.orderedList = data.ordered;
  }

  draw () {
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.fillText("LEADERBOARD", this.x, this.y);

    var self = this;
    this.orderedList.forEach(function (element, index) {
      ctx.beginPath();
      ctx.fillText("" + (index + 1) + ". " + element.username, self.x, self.y + 25 + (25 * index));
    });
  }
}

var leaderboard = new Leaderboard();
