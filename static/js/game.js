var socket = io();
socket.on('message', function(data) {
  console.log(data);
});

socket.emit('new player');

socket.on('state', function (data) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.list = data;
  for (var id in data) {
    var player_from_server = data[id];

    player.draw(player_from_server.x, player_from_server.y);
  }
});
