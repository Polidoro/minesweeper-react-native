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
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  boardHeight: 15,
  boardWidth: 10,

  render() {
    var theBoard = [];
    for (var i = 0; i < this.boardHeight; i++) {
      var row = [];
      for(var j = 0; j < this.boardWidth; j++) {
        row.push(<View key={j} style={[styles.gamePage.boardSquare, { backgroundColor: this.getRandomColor() }]} />)
      }
      theBoard.push(<View style={styles.gamePage.boardRow} key={i}>{row}</View>);
    }

    return (
      <View style={styles.gamePage.mainContainer}>
        <Text>Hello Text</Text>
        <View style={styles.gamePage.board}>{theBoard}</View>
      </View>
    );
  }
});

export default GamePage;