// EcgLine.js
'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let {Svg, Path} = require('react-native-svg-elements');

let EcgLine = React.createClass({
  propTypes: {
    ecgValues: React.PropTypes.array,
  },
  drawLine() {
    var path = `M ${0} ${this.props.ecgValues[0]}`;

    for (let i = 0; i < this.props.ecgValues.length; i = i) {
      path = path + ` L ${i * 10} ${this.props.ecgValues[i]}`
    }

    return path;
  },
  render() {
    return (
      <View style={styles.container}>
        <Svg width={2000} height={2000} style={styles.svg} forceUpdate={this.props.ecgValues.toString()}>
          <Path fill="none" stroke="#00D8FF" strokeWidth="10" strokeMiterlimit="10"
            d={this.drawLine()} />
        </Svg>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    width: 320,
    height: 150,
  },
});

module.exports = EcgLine;
