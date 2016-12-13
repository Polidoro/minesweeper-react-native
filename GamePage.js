import React from 'react';
import puns from './puns';
import styles from './styles';
import PunAnswer from './components/PunAnswer';
import Square from './components/Square';
import {
  TouchableHighlight,
  Text,
  Linking,
  View,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

var GamePage = React.createClass({
  getInitialState() {
    return {
      pan: new Animated.ValueXY(),
      gameType: this.props.gameType,
      boardArray: null,
      thePun: {
        boardWidth: 0,
        boardHeight: 0,
        question: '',
        answer: '',
      },
      flagX: 0,
      flagY: 0,
    };
  },

  getPun() {
    const thePuns = puns[this.state.gameType];
    const thePun = thePuns[Math.floor(Math.random()*thePuns.length)];
    return thePun;
  },

  componentDidMount() {
    let thePun = this.getPun();

    // A grid to store the location of all the mines
    const mineCount = thePun.answer.replace(/\s/g, '').length;
    let minesToPlace = mineCount;
    let squaresLeft = thePun.boardWidth * thePun.boardHeight;

    // An array to store the board values
    let boardArray = new Array(thePun.boardHeight);

    // Build the board based on the pun characteristics
    for (var i = 0; i < thePun.boardHeight; i++) {
      boardArray[i] = new Array(thePun.boardWidth);

      for (var j = 0; j < thePun.boardWidth; j++) {

        // Check if square is a mine
        let isMine = (Math.random() < minesToPlace/squaresLeft)
        if (isMine) minesToPlace--;
        squaresLeft--;
        boardArray[i][j] = isMine;
      }
    }

    this.setState({
      thePun: thePun,
      boardArray: boardArray
    });
  },

  render() {
    panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null,{
      dx : this.state.pan.x,
      dy : this.state.pan.y
    }]),
    onPanResponderRelease: (e, gesture) => {
      this.setState({
        flagX: gesture.dx,
        flagY: gesture.dy,
      });
      Animated.spring(
        this.state.pan,
        {toValue: {x: 0, y: 0}}
      ).start();}
    });

    // A grid to store all the squares that make up the board
    let theGrid = [];

    if(this.state.boardArray) {
      // Build the board based on the pun characteristics
      for (var i = 0; i < this.state.boardArray.length; i++) {
        let gridRow = [];

        for (var j = 0; j < this.state.boardArray[i].length; j++) {

          // Add a square to the row of squares to display
          gridRow.push(<Square isMine={this.state.boardArray[i][j]} row={i} column={j} key={j} />)
        }

        // Add the row to the grid of squares to display
        theGrid.push(<View style={styles.gamePage.boardRow} key={i}>{gridRow}</View>);
      }
    }
    return (
      <View style={styles.gamePage.mainContainer}>
        <Text style={styles.gamePage.questionText}>{this.state.thePun.question}</Text>
        <View style={styles.gamePage.board}>{theGrid}</View>
        <PunAnswer theAnswer={this.state.thePun.answer} />
        <Animated.View
          {...panResponder.panHandlers}
          style={[this.state.pan.getLayout(), styles.gamePage.theFlag]}
        />
        <Text>({this.state.flagX}, {this.state.flagY})</Text>
      </View>
    );
  }
});

export default GamePage;