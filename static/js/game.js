var socket = io();

function startGame () {
  //hide loading screen
  $("#loading_screen").fadeOut(1500);

  socket.on('message', function(data) {
    console.log(data);
  });

  socket.emit('new_player');

  socket.on('player_accepted', function () {
    if (html_admin_file) {
      var admin_password = prompt("ADMIN LOGIN");
      socket.emit("admin_password", admin_password);
    }
  });

  socket.on('map', function (data) {
    map.update(data);
  });

  socket.on('state', function (data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    map.draw();

    player.list = data.player;

    for (var id in data.bullet) {
      var bullet_from_server = data.bullet[id];

      bullet.draw(bullet_from_server, id);
    }

    for (var id in data.player) {
      var player_from_server = data.player[id];

      player.draw(player_from_server, id);
    }
  });

  socket.on('dead', function () {
    spriteList["deathSound"].play();
    $("#death_screen").fadeIn(3000);
  });
}
