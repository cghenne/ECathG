// ECathG.js
'use strict';

let React = require('react-native');
let io = require('socket.io-client/socket.io');

let {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

let EcgLine = require('./components/EcgLine');

let ECathG = React.createClass({
  getDefaultEcg() {
    let defaultEcg = [];

    for (let i = 0; i < 500; i++) {
      defaultEcg.push({0, 0});
    }

    return defaultEcg;
  },
  getInitialState(){
    return {
      socket: io('http://miaou.local:3000'),
      isSocketConnected: false,
      isDeviceConnected: false,
      ecgValues: getDefaultEcg(),
    }
  },
  componentDidMount() {
    this.state.socket.on('connect', () => {
      this.setState({isSocketConnected: true});
      this.state.socket.on('ecgValues', function (data) {
        let newValues = this.state.ecgValues.splice(0, 50, data);
        this.setState({isDeviceConnected: true, ecgValues: newValues});
      }.bind(this));
    }.bind(this));
  },
  connectDevice() {
    // here we can retry a connection to the device
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.connectivity}>
          <Text>Socket: {this.state.isSocketConnected ? 'connected' : 'disconnected'}</Text>
          <Text>Device: {this.state.isDeviceConnected ? 'connected' : 'disconnected'}</Text>
        </View>
        {!this.state.isSocketConnected ? <Text>There's an issue with the node server.</Text>
        : <TouchableHighlight onPress={this.connectDevice}>
            <Text style={styles.button}>Connect</Text>
          </TouchableHighlight>
        }
        <EcgLine ecgValues={this.state.ecgValues}/>
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
  button: {
    backgroundColor: 'blue',
    color: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  connectivity: {
    marginTop: 20,
  },
});

module.exports = ECathG;
