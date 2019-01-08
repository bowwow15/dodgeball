class TextDisplay {
  constructor () {
    this.alertList = [];
  }

  drawRoomNumber (number) {
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    ctx.beginPath();
    ctx.fillText("Room " + number.toString(), canvas.width - 15, 25);
  }

  newAlert (text) {
    this.alertList.push({
      text: text,
      expiration: Date.now() + 3000
    });
  }

  drawAlerts () {
    var currentDrawn = 0;
    this.alertList.forEach(function (element, index) {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.fillText(element.text, canvas.width - 15, (currentDrawn * 25) + 65);

      currentDrawn += 1;

      if (Date.now() > element.expiration) {
        delete textDisplay.alertList[index];
      }
    });
  }
}

var textDisplay = new TextDisplay();
