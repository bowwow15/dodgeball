var Key = {
  keyW: false,
  keyA: false,
  keyS: false,
  keyD: false,

  triggerWhenPressed: function () {
    var movement = {x:0, y:0};

    if (this.keyW) {movement.y -= player.speed;}
    if (this.keyA) {movement.x -= player.speed;}
    if (this.keyS) {movement.y += player.speed;}
    if (this.keyD) {movement.x += player.speed;}

    socket.emit("movement", movement);
  }
}

function changeKeyState (event, bool) {
  switch (event.keyCode) {
    case 87: //up
    Key.keyW = bool;
    break;
    case 83: //down
    Key.keyS = bool;
    break;
    case 65: //left
    Key.keyA = bool;
    break;
    case 68: //right
    Key.keyD = bool;
    break;
  }
}

window.addEventListener("keydown", function (event) { changeKeyState(event, true); });
window.addEventListener("keyup", function (event) { changeKeyState(event, false); });


window.setInterval(function () {
  Key.triggerWhenPressed();
}, 1000/30);
