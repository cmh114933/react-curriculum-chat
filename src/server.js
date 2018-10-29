const io = require('socket.io')();

let users = []
let socketIdMap = {}

io.on('connection', (client) => {
  client.on('subscribeToGroupChat', () => {
    const userName = `test_user_${users.length}`
    users.push(userName)
    socketIdMap[userName] = client.id
    client.emit('receiveUserName', userName)
    io.emit('availableUsers', Object.keys(socketIdMap))
  })

  client.on('broadcastMessage', (message) => {
    io.emit('broadcastMessage', message)
  })

  client.on('privateBroadcastMessage', (message) => {
    client.emit('privateBroadcastMessage', message)
    io.to(`${socketIdMap[message.recipientName]}`).emit('privateBroadcastMessage', message);
  })

  client.on('disconnect', () => {
    console.log("A user has disconnected")
  })
});



const port = 8000;
io.listen(port);
console.log('listening on port ', port);