'use strict'

// The server will be responsible of creating and handling the bluetooth/serial connection
// with the device using node-serialport and then will send the data to the react native app
// using socket.io

let SerialPort = require('serialport').SerialPort
let httpServer = require('http').createServer();
let io = require('socket.io')(httpServer);
let port = 3000;

httpServer.listen(port);

let socket = null;

io.on('connection', mySocket => {
  socket = mySocket;
});

let buffer = [];
let countPoint = 0;

let serialPort = new SerialPort('/dev/cu.HC-06-DevB', {
  baudrate: 9600
});

serialPort.on("open", function () {
  serialPort.on('data', function(data) {
    handleData(data);
  });
});


function sendToReactNative(valueX, valueY) {
  if (socket) {
    socket.emit('ecgValue', {
      valueX: valueX,
      valueY: valueY,
    });
    console.log(valueX, valueY);
  } else {
    console.log('Socket isn\'t ready yet');
  }
}

function handleData(data) {
  if (data) {
    let vals = new Uint8Array(data);
    for (let i = 0; i < vals.length; i++) {
      buffer.push(vals[i]);
      if (buffer.length === 3) {
        let ecgValue = (buffer[1]<<8) + buffer[2];
        sendToReactNative(countPoint++, ecgValue);
        buffer = [];
      }
    };
  }
};
