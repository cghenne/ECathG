// ECathG.js

'use strict';

let React = require('react-native');
let SocketIO = require('react-native-swift-socketio');

let {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

let ECathG = React.createClass({
  getInitialState(){
    return {
      isAppReady: false,
      socket: new SocketIO('http://miaou.local:3000', {}),
      socketState: {status: 'not-connected'},
    }
  },
  componentDidMount() {
    this.state.socket.connect();
    this.state.socket.on('connect', () => {
      this.setState({socketState: 'connected'});
    });
  },
  connectDevice(){
    if (this.state.socketState === 'connected') {
      socket.emit('appIsReady', {});
      socket.on('ecgValue', function (data) {
        console.log(data);
      });
    } else {
      console.log('Your server isn\'t running');
    }
  },
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.connectDevice}>
          {this.state.socketState === 'connected' ?
            <Text style={styles.connected}>Connected. Have a look at the console!</Text>
          : <Text style={styles.button}>Start</Text>}
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
  connected: {

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
