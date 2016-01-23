'use strict'

// The server will be responsible of creating and handling the bluetooth/serial connection
// with the device using node-serialport and then will send the data to the react native app
// using socket.io


const config = require('./config');
const socket = require('./connectors/websockets');
const serial = require('./connectors/serial');

socket.listen(config.socketPort);
serial.connect(config.device, config.baudrate, handleData);

// We want to create a packet of [packetSize] values to send to the front end
// 1 value = {x: data point - y: ecg value}
// the serial connection sends back a flow of bytes with the first one being 170
// and the ecg value coded on the second and third one

const buffer = require('./data/buffer');
const packet = require('./data/packet');

packet.initPacket(config.packetSize);

function handleData(data) {
  if (data) {
    let vals = new Uint8Array(data);
    for (let i = 0; i < vals.length; i++) {
      buffer.addData(vals[i]);
      let ecgValue = buffer.getEcgValue();

      if (ecgValue) {
        if (packet.addData(ecgValue)) {
          if (!socket.emitEvent('ecgValues', packet.exportData())) {
            console.log('Socket isn\'t ready yet');
          }
        }
      }
    };
  }
};
