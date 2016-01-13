# ECathG


## Hardware

Arduino Micro: http://befr.rs-online.com/web/p/processor-microcontroller-development-kits/7717667/

Olimex EKG Shield: https://www.olimex.com/Products/Duino/Shields/SHIELD-EKG-EMG/

Bluetooth 2.0 Slave: http://letmeknow.fr/shop/arduino/10-module-bluetooth-arduino-4894479454268.html


## Software

For the purpose of this demo the native bluetooth won't be implemented. I tried to do a native iOS and android module to handle the bluetooth but the iOS one isn't that easy because it's not BLE and it requires using a private framework which isn't documented. I plan to update the bluetooth 2.0 to BLE later.

Instead I will use a node server with SerialPort and Socket.io to handle the flow of data.

### Server

SerialPort: https://github.com/voodootikigod/node-serialport

Socket.io: http://socket.io/


### React Native App

React Native: https://facebook.github.io/react-native/

Socket.io client with React Native: http://browniefed.com/blog/2015/05/16/react-native-and-socket-dot-io/
