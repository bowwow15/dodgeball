var socket = io();

var gameRunning = false;

var Game = {
  room: 0,
  motionBlur: 0.6,

  stateUpdate: function (data) {
    ctx.globalAlpha = Game.motionBlur;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    textDisplay.drawRoomNumber(data.room);
    textDisplay.drawAlerts();
    leaderboard.draw();
    minimap.draw();
  }
};

function showLogin () {
  $("#username").focus(); //firefox

  var storedUsername = window.localStorage.getItem('username');
  if (storedUsername) {
    $("#usernameField").val(storedUsername);
  }

  //hide loading screen
  $("#loading_screen").fadeOut(1500);

  window.setTimeout(function () {
    $("#welcomeSplash").fadeIn(500);
    $("#username").fadeIn(500);
    $("#howtoplay").fadeIn(500);
  }, 1000);

  socket.on('room', function (room) {
    Game.room = room;
  });

  socket.on('map', function (data) {
    map.update(data);
  });

  socket.on('leaderboard', function (data) {
    leaderboard.update(data);
  });

  socket.on('textAlert', function (data) {
    textDisplay.newAlert(data.text);
  });

  socket.on('state', function (data) {
    Game.stateUpdate(data);
  });
}

function enterUsername () {
  var username = $("#usernameField").val();

  if (username.length > 0) {
    window.localStorage.setItem('username', username);
    startGame(username);
    $("#username").blur();
    $("#welcomeSplash").fadeOut(500);
    $("#username").fadeOut(500);
    $("#howtoplay").fadeOut(500);
  }
}

function startGame (username) {
  socket.on('message', function(data) {
    console.log(data);
  });

  //show chat room
  $("#chat").show();
  //"Press F to chat"
  $("#chatFeed").html("Press F to chat");
  window.setTimeout(function () {
    $("#chatFeed").html("");
  }, 7000);

  socket.emit('new_player', {username: username});

  socket.on('player_accepted', function () {
    if (html_admin_file) {
      var admin_password = prompt("ADMIN LOGIN");
      socket.emit("admin_password", admin_password);
    }

    gameRunning = true;
  });

  socket.on('dead', function (data) {
    if (data.killer != null) {
      $("#killer").html(data.killer + " tagged you.")
    }
    spriteList["deathSound"].play();
    $("#death_screen").fadeIn(3000);
  });
}
