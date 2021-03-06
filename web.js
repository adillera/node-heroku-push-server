var app  = require('http').createServer(),
    io   = require('socket.io').listen(app),
    port = process.env.PORT || 9595;


app.listen(port)


// Configuration for Heroku
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});


io.sockets.on('connection', function(socket) {
  socket.on('subscribe', function(channel) {
    socket.join(channel);
  });


  socket.on('send', function(data) {
    socket.broadcast.to(data.channel).emit('data', data.values);
  });
});
