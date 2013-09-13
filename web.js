var app = require('http').createServer(handler),
    io  = require('socket.io').listen(app);


app.listen(9595)


var handler = function(req, res) {
  console.log('Node-Breadcrumbs server started!')
}

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
