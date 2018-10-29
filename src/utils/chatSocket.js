import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export function subscribeToGroupChat(userName, callback) {
  socket.on('broadcastMessage', (message) => callback(message));
  socket.emit('subscribeToGroupChat', userName);
}

export function sendMessage(message) {
  socket.emit('broadcastMessage', message)
}