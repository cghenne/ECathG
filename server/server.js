'use strict'

// The server will be responsible of creating and handling the bluetooth/serial connection
// with the device using node-serialport and then will send the data to the react native app
// using socket.io

let SerialPort = require("serialport").SerialPort
let serialPort = new SerialPort("/dev/cu.HC-06-DevB", {
  baudrate: 9600
});

let vals = [];

serialPort.on("open", function () {
  serialPort.on('data', function(data) {
    handleData(data);
  });
});

function handleData(data) {
  if (data) {
    vals = new Uint8Array(data);
    console.log(vals);
  }
};
