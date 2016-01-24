'use strict';

let buffer = [];

let getEcgValue = () => {
  if (buffer.length === 2) {
    return (buffer[0] << 8) + buffer[1];
  } else {
    return null;
  }
}

let addData = value => {
  value === 170 ? buffer = [] : buffer.push(value);
}

exports.addData = addData;
exports.getEcgValue = getEcgValue;
