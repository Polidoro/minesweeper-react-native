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
      boardArray: [[]],
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
        ).start();
      }
    });

    return (
      <View style={styles.gamePage.mainContainer}>
        <Text style={styles.gamePage.questionText}>{this.state.thePun.question}</Text>
        <View style={styles.gamePage.board}>{this.state.theGrid}</View>
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