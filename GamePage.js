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
      boardWidth: 0,
      boardHeight: 0,
      boardStartX: 0,
      boardStartY: 0,
      thePun: {
        boardCols: 0,
        boardRows: 0,
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
    // A grid to store the location of all the mines
    const mineCount = thePun.answer.replace(/\s/g, '').length;
    let minesToPlace = mineCount;
    let squaresLeft = thePun.boardCols * thePun.boardRows;

    // An array to store the board values
    let boardArray = new Array(thePun.boardRows);

    // Build the board based on the pun characteristics
    for (let i = 0; i < thePun.boardRows; i++) {
      boardArray[i] = new Array(thePun.boardCols);

      for (let j = 0; j < thePun.boardCols; j++) {
        // Decide if square should be a mine
        let isMine = (Math.random() < minesToPlace/squaresLeft)
        if (isMine) minesToPlace--;
        squaresLeft--;
        boardArray[i][j] = {
          isMine: isMine,
          isFlagged: false,
          isOpened: false,
        }
      }
    }

    return boardArray;
  },

  componentDidMount() {
    const thePun = this.getPun();
    const boardArray = this.generateBoard(thePun);

    this.setState({
      thePun: thePun,
      boardArray: boardArray
    });
  },

  openSquare(i, j) {
    let newBoard = this.state.boardArray;
    newBoard[i][j].isOpened = true;

    this.setState({
      boardArray: newBoard
    })
  },

  measureBoard(event) {
    this.refs['board'].measure((fx, fy, width, height, px, py) => {
      this.setState({
        boardWidth: width,
        boardHeight: height,
        boardStartX: px,
        boardStartY: py,
      });
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
      let newBoard = this.state.boardArray
      let xWithRespectToBoard = (gesture.moveX - this.state.boardStartX);
      let yWithRespectToBoard = (gesture.moveY - this.state.boardStartY);

      if(xWithRespectToBoard > 0 && xWithRespectToBoard < this.state.boardWidth && yWithRespectToBoard > 0 && yWithRespectToBoard < this.state.boardHeight) {
        newBoard[Math.floor(yWithRespectToBoard / (this.state.boardHeight / this.state.thePun.boardRows))][Math.floor(xWithRespectToBoard / (this.state.boardWidth / this.state.thePun.boardCols))].isFlagged = true;
        this.setState({ theBoard: newBoard })
      }

      Animated.spring(
        this.state.pan,
        {toValue: {x: 0, y: 0}}
      ).start()}
    });

    // A grid to store all the squares that make up the board
    let theGrid = [];

    // Build the board based on the pun characteristics
    for (let i = 0; i < this.state.boardArray.length; i++) {
      let gridRow = [];

      for (let j = 0; j < this.state.boardArray[i].length; j++) {
        // Add a square to the row
        gridRow.push(
          <TouchableHighlight key={j} onPress={() => this.openSquare(i, j)} underlayColor="#FAEB00">
            <View><Square squareData={this.state.boardArray[i][j]} /></View>
          </TouchableHighlight>
        )
      }

      // Add the row to the grid of squares to display
      theGrid.push(<View style={styles.gamePage.boardRow} key={i}>{gridRow}</View>);
    }

    return (
      <View style={styles.gamePage.mainContainer}>
        <Text style={styles.gamePage.questionText}>{this.state.thePun.question}</Text>
        <View ref='board' style={styles.gamePage.board} onLayout={(event) => this.measureBoard(event)}>{theGrid}</View>
        <PunAnswer theAnswer={this.state.thePun.answer} />
        <Animated.View
          {...panResponder.panHandlers}
          style={[this.state.pan.getLayout(), styles.gamePage.theFlag]}
        />
        <Text>({this.state.boardWidth}, {this.state.boardHeight})</Text>
      </View>
    );
  }
});

export default GamePage;