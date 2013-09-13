var app = require('http').createServer(),
    io  = require('socket.io').listen(app);

app.listen(9595)

io.sockets.on('connection', function(socket) {
  socket.on('subscribe', function(channel) {
    socket.join(channel);
  });


  socket.on('send', function(data) {
    socket.broadcast.to(data.channel).emit('data', data.values);
  });
});
