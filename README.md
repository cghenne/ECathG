# ECathG

## Hardware
Arduino Micro: http://befr.rs-online.com/web/p/processor-microcontroller-development-kits/7717667/

Olimex EKG Shield: https://www.olimex.com/Products/Duino/Shields/SHIELD-EKG-EMG/

Bluetooth 2.0 Slave: http://letmeknow.fr/shop/arduino/10-module-bluetooth-arduino-4894479454268.html

## Software

For the purpose of this demo the native bluetooth won't be implemented. I tried to do a native iOS and androind module to handle the bluetooth but the iOS one isn't that easy because it's not BLE and it requires using a private framework which isn't documented. I plan to update the bluetooth 2.0 to BLE later.

Instead I will use a node server with Johnny-Five and Socket.io to handle the flow of data.

In order to make the HC-06 bluetooth serial port work with Johnny-Five I have to manually specify the port and also make sure the baudrate is correct. HC-06 use by default 9600 and Johnny-Five needs 57600 for its FirmData. https://github.com/rwaldron/johnny-five/wiki/Getting-Started-with-Johnny-Five-and-JY-MCU-Bluetooth-Serial-Port-Module

React Native: https://facebook.github.io/react-native/

Johnny-Five: http://johnny-five.io/

Socket.io: http://socket.io/
