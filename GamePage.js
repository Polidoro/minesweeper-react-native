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
    const mineCount = thePun.answer.replace(/\s/g, '').length;
    let minesToPlace = mineCount;
    let squaresLeft = thePun.boardWidth * thePun.boardHeight;
    
    // A grid to store the location of all the mines
    let boardArray = new Array(thePun.boardWidth);

    // A grid to store all the squares that make up the board
    let theGrid = [];

    // Build the board based on the pun characteristics
    for (var i = 0; i < thePun.boardHeight; i++) {
      boardArray[i] = new Array(thePun.boardWidth);
      let gridRow = [];

      for (var j = 0; j < thePun.boardWidth; j++) {

        // Check if square is a mine
        let isMine = (Math.random() < minesToPlace/squaresLeft)
        if (isMine) minesToPlace--;
        squaresLeft--;
        boardArray[i][j] = isMine;

        // Add a square to the row of squares to display
        gridRow.push(<Square isMine={isMine} row={i} column={j} key={j} />)
      }

      // Add the row to the grid of squares to display
      theGrid.push(<View style={styles.gamePage.boardRow} key={i}>{gridRow}</View>);
    }

    return {
      boardArray,
      theGrid,
    };
  },

  componentDidMount() {
    const thePun = this.getPun();
    const board = this.generateBoard(thePun);

    this.setState({
      thePun: thePun,
      boardArray: board.boardArray,
      theGrid: board.theGrid,
    });
  },

  render() {
    return (
      <View style={styles.gamePage.mainContainer}>
        <Text style={styles.gamePage.questionText}>{this.state.thePun.question}</Text>
        <View style={styles.gamePage.board}>{this.state.theGrid}</View>
        <PunAnswer theAnswer={this.state.thePun.answer} />
      </View>
    );
  }
});

export default GamePage;