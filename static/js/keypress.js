function changeKeyState (event, bool) {
  socket.emit('keypress', {
    keyCode: event.keyCode,
    bool: bool
  });
}

window.addEventListener("keydown", function (event) { changeKeyState(event, true); });
window.addEventListener("keyup", function (event) { changeKeyState(event, false); });
