import React from 'react';
import puns from './puns';
import styles from './styles';
import PunAnswer from './components/PunAnswer';
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
  getPun() {
    const thePuns = puns[this.props.gameType];
    const thePun = thePuns[Math.floor(Math.random()*thePuns.length)];
    return thePun;
  },

  boardHeight: 5,
  boardWidth: 10,

  render() {
    const thePun = this.getPun();

    let theBoard = [];
    for (var i = 0; i < this.boardHeight; i++) {
      var row = [];
      for(var j = 0; j < this.boardWidth; j++) {
        row.push(<View key={j} style={[styles.gamePage.boardSquare]} />)
      }
      theBoard.push(<View style={styles.gamePage.boardRow} key={i}>{row}</View>);
    }

    return (
      <View style={styles.gamePage.mainContainer}>
        <Text>{thePun.question}</Text>
        <View style={styles.gamePage.board}>{theBoard}</View>
        <PunAnswer theAnswer={thePun.answer} />
      </View>
    );
  }
});

export default GamePage;