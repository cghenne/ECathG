// ECathG.js

'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var ECathG = React.createClass({
  getInitialState(){
    return {
      isSearchingDevice: false,
    }
  },
  connectDevice(){
    this.setState({isSearchingDevice: true});
    alert('hello');
  },
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.connectDevice}>
          {this.state.isConnecting ?
            <Text style={styles.connecting}>Connecting...</Text>
          : <Text style={styles.button}>Connect to my ECG device</Text>}
        </TouchableHighlight>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connecting: {

  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
  }
});

module.exports = ECathG;
