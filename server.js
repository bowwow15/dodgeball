// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

// Game Dependencies
var player = require('./game_modules/player.js');
var map = require('./game_modules/map.js');


//Set port for Heroku
var PORT = process.env.PORT || 5000;

app.set('port', PORT);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/static/index.html'));
});
// Starts the server.
server.listen(PORT, function() {
  console.log('Starting server on port ' + PORT);
});


// Add the WebSocket handlers

io.on('connection', function (socket) {
  socket.on('new player', function() {
    player.new(socket);
  });

  socket.on('keypress', function(data) {
    if (player.list[socket.id]) {
      player.list[socket.id].keyEvent(data.keyCode, data.bool);
    }
  });

  socket.on('disconnect', function () {
    delete player.list[socket.id];

    console.log("Player " + socket.id + " disconnected.");
  });

  //emit map dimensions
  socket.emit('map', map);
});

setInterval(function() {
  var augmentedPlayerList = {};

  for (var id in player.list) {
    var current_player = player.list[id];

    augmentedPlayerList[id] = current_player.modelForClient();
  } // get player properties for client

  io.sockets.emit('state', augmentedPlayerList);
}, 1000 / 60);

setInterval(function() {
  for (var id in player.list) {
    player.list[id].triggerWhenPressed(map);
  }
}, 1000 / 30);
