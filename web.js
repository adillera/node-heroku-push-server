var app = require('http').createServer(handler),
    io  = require('socket.io').listen(app);

app.listen(80)

var handler = function(req, res) {
  console.log('Node-Breadcrumbs server started!')
}

io.sockets.on('connection', function(socket) {
  socket.on('subscribe', function(channel) {
    socket.join(channel);
  });


  socket.on('send', function(data) {
    socket.broadcast.to(data.channel).emit('data', data.values);
  });
});
