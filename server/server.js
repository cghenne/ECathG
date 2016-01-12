'use strict'

// The server will be responsible of creating and handling the bluetooth/serial connection
// with the device using node-serialport and then will send the data to the react native app
// using socket.io

let SerialPort = require('serialport').SerialPort
let httpServer = require('http').createServer();
let io = require('socket.io')(httpServer);

httpServer.listen(3000);

let socket = null;
let isAppReady = false;

io.on('connection', mySocket => {
  socket = mySocket;

  socket.on('appIsReady', () => {
    isAppReady = true;
  });
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
  if (socket && isAppReady) {
    socket.emit('ecgValue', {valueX: valueX, valueY: valueX});
  } else {
    console.log('Socket or App isn\'t ready yet');
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
