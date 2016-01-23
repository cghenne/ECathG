'use strict';

const SerialPort = require('serialport').SerialPort;
let serialConnection = null;
let errorMessage = '';

let connect = (device, baudrate, callback) => {
  serialConnection = new SerialPort(device, {baudrate: baudrate}, false);
  serialConnection.open(error => {
    if (error) {
      return false;
    } else {
      serialConnection.on('data', (data) => {
        callback(data);
      });
      return true;
    }
  });
}

let isOpen = () => {
  return serialConnection.isOpen();
}

let getErrorMessage = () => {
  return errorMessage;
}

exports.connect = connect;
exports.isOpen = isOpen;
