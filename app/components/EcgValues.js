'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  ListView,
  View,
} = React;

var EcgValues = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds,
    };
  },
  renderRow(rowData) {
    var {
      valueX,
      valueY,
    } = rowData;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.values}>X: {valueX} - Y: {valueY}</Text>
        </View>
      </View>
    );
  },
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.props.data)}
        renderRow={this.renderRow}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 15,
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  values: {
    fontWeight: 'bold',
    color: '#c81e55',
    flex: 1,
  },
});

module.exports = EcgValues;
