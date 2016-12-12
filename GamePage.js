import React from 'react';
import puns from './puns';
import styles from './styles';
import PunAnswer from './components/PunAnswer';
import Square from './components/Square';
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
  getInitialState() {
    return {
      gameType: this.props.gameType,
      thePun: {
        question: '',
        answer: '',
      },
    }
  },

  getPun() {
    const thePuns = puns[this.state.gameType];
    const thePun = thePuns[Math.floor(Math.random()*thePuns.length)];
    return thePun;
  },

  componentDidMount() {
    this.setState({
      thePun: this.getPun()
    });
  },


  boardHeight: 5,
  boardWidth: 10,

  render() {
    let theBoard = [];
    for (var i = 0; i < this.boardHeight; i++) {
      var row = [];
      for(var j = 0; j < this.boardWidth; j++) {
        row.push(<Square key={j} />)
      }
      theBoard.push(<View style={styles.gamePage.boardRow} key={i}>{row}</View>);
    }

    return (
      <View style={styles.gamePage.mainContainer}>
        <Text style={styles.gamePage.questionText}>{this.state.thePun.question}</Text>
        <View style={styles.gamePage.board}>{theBoard}</View>
        <PunAnswer theAnswer={this.state.thePun.answer} />
      </View>
    );
  }
});

export default GamePage;