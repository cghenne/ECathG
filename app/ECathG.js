// ECathG.js

'use strict';

let React = require('react-native');
let io = require('socket.io-client/socket.io');

let {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} = React;

let EcgValues = require('./components/EcgValues');

let ECathG = React.createClass({
  getInitialState(){
    return {
      socket: io('http://miaou.local:3000'),
      socketState: {status: 'not-connected'},
      ecgValues: [],
    }
  },
  componentDidMount() {
    this.state.socket.on('connect', () => {
      this.setState({socketState: 'connected'});

      this.state.socket.on('ecgValue', function (data) {
        let newEcgValues = this.state.ecgValues;
        newEcgValues.push(data);
        this.setState({ecgValues: newEcgValues});
      }.bind(this));
    }.bind(this));
  },
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight>
          {this.state.socketState === 'connected' ?
            <Text style={styles.connected}>Connected.</Text>
          : <Text style={styles.button}>Start</Text>}
        </TouchableHighlight>
        {this.state.socketState !== 'connected' ? null :
          <ScrollView>
            <View>
              <EcgValues data={this.state.ecgValues}/>
            </View>
          </ScrollView>
        }
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
  connected: {
    marginTop: 20,
  },
});

module.exports = ECathG;
