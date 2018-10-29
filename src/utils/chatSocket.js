import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export function subscribeToGroupChat(callback, receiveUserNameCallback) {
  socket.on('broadcastMessage', (message) => callback(message));
  socket.on('receiveUserName', (userName) => { receiveUserNameCallback(userName) })
  socket.emit('subscribeToGroupChat');
}

export function subscribeToPrivateChats(callback) {
  socket.on('privateBroadcastMessage', (message) => { callback(message) })
}

export function subscribeToAvailableUsers(callback) {
  socket.on('availableUsers', (users) => callback(users))
}

export function sendMessage(message) {
  socket.emit('broadcastMessage', message)
}

export function sendPrivateMessage(message) {
  socket.emit('privateBroadcastMessage', message)
}