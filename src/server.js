const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('subscribeToGroupChat', (userName) => {
    console.log(userName, 'has subscribed to Group Chat.')
  })

  client.on('broadcastMessage', (message) => {
    console.log(message.user.name, ': ', message.text)
    io.emit('broadcastMessage', message)
  })

  client.on('disconnect', () => {
    console.log("A user has disconnected")
  })
});



const port = 8000;
io.listen(port);
console.log('listening on port ', port);