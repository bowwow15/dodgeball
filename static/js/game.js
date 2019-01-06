var socket = io();

function startGame () {
  //hide loading screen
  document.getElementById("loading_screen").style.display = "none";

  socket.on('message', function(data) {
    console.log(data);
  });

  socket.emit('new player');

  socket.on('map', function (data) {
    map.update(data);
  });

  socket.on('state', function (data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    map.draw();

    player.list = data.player;

    for (var id in data.bullet) {
      var bullet_from_server = data.bullet[id];
      console.log(bullet_from_server);

      bullet.draw(bullet_from_server, id);
    }

    for (var id in data.player) {
      var player_from_server = data.player[id];

      player.draw(player_from_server, id);
    }
  });

  socket.on('dead', function () {
    alert("ur dead lmao");
  });
}
