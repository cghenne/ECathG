'use strict';
// there s an error on the logic here still

let buffer = [];
let countPoint = 0;

let getEcgValue = () => {
  if (buffer.length === 2) {
    let valX = (buffer[0] << 8) + buffer[1];
    let valY = countPoint;
    countPoint += 1;
    return {valX, valY};
  } else {
    return null;
  }
}

let addData = value => {
  value === 170 ? buffer = [] : buffer.push(value);
}

exports.addData = addData;
exports.getEcgValue = getEcgValue;
