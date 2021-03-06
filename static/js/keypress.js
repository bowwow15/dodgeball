function changeKeyState (event, bool) {
  //if F key, toggle chat
  if (event.keyCode == 70 && bool == false && !$("#chatInput").is(":focus") && gameRunning) {
    $("#chatInput").show();
    $("#chatInput").focus();
    $("#chatInput").val('');
  } else {
    if (!$("#chatInput").is(":focus")) { //tests if chat input is focued before sending keys to server
      socket.emit('keypress', {
        keyCode: event.keyCode,
        bool: bool
      });
    }
  }
}

window.addEventListener("keydown", function (event) { changeKeyState(event, true); });
window.addEventListener("keyup", function (event) { changeKeyState(event, false); });

window.addEventListener("mousedown", function (event) {
  if (gameRunning) {
    socket.emit('sound_effect', "shootSound");
  }

  var angle = 0;
  angle = Math.atan2(event.clientY - (canvas.height / 2), event.clientX - (canvas.width / 2));

  socket.emit('mousedown', {
    angle: angle
  });
});

var Mouse = {
  x: 0, y: 0
};

window.addEventListener("mousemove", function (event) {
  Mouse.x = event.clientX;
  Mouse.y = event.clientY;
})
