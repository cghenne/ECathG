'use strict';

let packet = [];
let packetSize = 10; // default

let initPacket = newSize => {
  packetSize = newSize;
}

let exportData = () => {
  let ecgValues = packet;
  packet = [];
  return ecgValues;
}

let addData = value => {
  packet.push(value);
  return packet.length === packetSize - 1;
}

exports.initPacket = initPacket;
exports.addData = addData;
exports.exportData = exportData;
