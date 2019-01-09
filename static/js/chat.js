var Chat = {
  array: []
};

function submitChat () {
  var chatMessage = $("#chatInput").val();
  socket.emit('chat_message', {text: chatMessage});

  $("#chatInput").blur();
  $("#chatInput").val('');
  $("#chatInput").hide();
}

socket.on('chatFeed', function (data) {
  Chat.array.push(data);
  if (Chat.array.length > 5) {
    Chat.array.splice(0, 1); //removes first element
  }
  $("#chatFeed").html(''); //clear inner html
  Chat.array.forEach(function (element, index) {
    $("#chatFeed").append("<span style='color: red;'>" + element.username + "</span>: <span>" + element.text + "</span><br>");
  });
});
