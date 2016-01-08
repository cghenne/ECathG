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

var RNBluetooth = require('react-native').NativeModules.RNBluetooth;

var ECathG = React.createClass({
  getInitialState(){
    return {
      isSearchingDevice: false,
    }
  },
  searchForDevice(){
    this.setState({isSearchingDevice: true});
    RNBluetooth.findDevice((results) => {
      console.log(results);
      this.setState({isSearchingDevice: false});
    });
  },
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.searchForDevice}>
          {this.state.isSearchingDevice ?
            <Text style={styles.searching}>Searching...</Text>
          : <Text style={styles.button}>Search for my device</Text>}
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
  searching: {

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
