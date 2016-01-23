'use strict';

const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer);

let socket = null;

let listen = port => {
  httpServer.listen(port);
  io.on('connection', mySocket => {
    socket = mySocket;
  });
  io.on('disconnect', () => {
    socket = null;
  });
};

let isConnected = () => {
  return socket !== null;
}

let emitEvent = (eventName, data) => {
  if (isConnected()) {
    socket.emit(eventName, data);
    return true;
  } else {
    return false;
  }
}

exports.listen = listen;
exports.isConnected = isConnected;
exports.emitEvent = emitEvent;
