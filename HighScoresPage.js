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

var HighScoresPage = React.createClass({
  render() {
    return (
      <View style={styles.menuPage.mainContainer}>
        <Text>Hello I am high scores</Text>
      </View>
    );
  }
});

export default HighScoresPage;