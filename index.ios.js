'use strict';

let React = require('react-native');
let {AppRegistry} = React;

window.navigator.userAgent = "react-native";

let ECathG = require('./app/ECathG');

AppRegistry.registerComponent('ECathG', () => ECathG);
