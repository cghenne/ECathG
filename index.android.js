'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var ECathG = require('./app/ECathG');

AppRegistry.registerComponent('ECathG', () => ECathG);
