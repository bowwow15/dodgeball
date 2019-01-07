function changeKeyState (event, bool) {
  socket.emit('keypress', {
    keyCode: event.keyCode,
    bool: bool
  });
}

window.addEventListener("keydown", function (event) { changeKeyState(event, true); });
window.addEventListener("keyup", function (event) { changeKeyState(event, false); });

window.addEventListener("mousedown", function (event) {
  var angle = 0;
  angle = Math.atan2(event.clientY - (canvas.height / 2), event.clientX - (canvas.width / 2));

  socket.emit('mousedown', {
    angle: angle
  });

  if (gameRunning) {
    socket.emit('sound_effect', "shootSound");
  }
});

var Mouse = {
  x: 0, y: 0
};

window.addEventListener("mousemove", function (event) {
  Mouse.x = event.clientX;
  Mouse.y = event.clientY;
})
