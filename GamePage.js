import React from 'react';
import styles from './styles';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  Linking,
  View,
} from 'react-native';

var GamePage = React.createClass({
  render() {
    return (
      <View style={styles.menuPage.mainContainer}>
        <Text style={{color: 'blue'}}>{this.props.gameType}</Text>
      </View>
    );
  }
});

export default GamePage;