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
      boardArray: [[]],
      thePun: {
        boardWidth: 0,
        boardHeight: 0,
        question: '',
        answer: '',
      },
    };
  },

  getPun() {
    const thePuns = puns[this.state.gameType];
    const thePun = thePuns[Math.floor(Math.random()*thePuns.length)];
    return thePun;
  },

  generateBoard(thePun) {
    const mineCount = thePun.answer.length;
    var boardArray = new Array(thePun.boardWidth);

    for (var i = 0; i < thePun.boardHeight; i++) {
      boardArray[i] = new Array(thePun.boardWidth);
    }

    return boardArray;
  },

  componentDidMount() {
    
    const thePun = this.getPun();
    const boardArray = this.generateBoard(thePun);

    let theSquares = [];
    for (var i = 0; i < thePun.boardHeight; i++) {
      var row = [];
      for(var j = 0; j < thePun.boardWidth; j++) {
        row.push(<Square adjacentBombs={boardArray[i][j]} key={j} />)
      }
      theSquares.push(<View style={styles.gamePage.boardRow} key={i}>{row}</View>);
    }
    
    this.setState({
      thePun: thePun,
      boardArray: boardArray,
      theSquares: theSquares,
    });
  },

  render() {
    return (
      <View style={styles.gamePage.mainContainer}>
        <Text style={styles.gamePage.questionText}>{this.state.thePun.question}</Text>
        <View style={styles.gamePage.board}>{this.state.theSquares}</View>
        <PunAnswer theAnswer={this.state.thePun.answer} />
      </View>
    );
  }
});

export default GamePage;