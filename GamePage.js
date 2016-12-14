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
    // A grid to store the location of all the mines
    const mineCount = thePun.answer.replace(/\s/g, '').length;
    let minesToPlace = mineCount;
    let squaresLeft = thePun.boardWidth * thePun.boardHeight;

    // An array to store the board values
    let boardArray = new Array(thePun.boardHeight);

    // Build the board based on the pun characteristics
    for (let i = 0; i < thePun.boardHeight; i++) {
      boardArray[i] = new Array(thePun.boardWidth);

      for (let j = 0; j < thePun.boardWidth; j++) {
        // Decide if square should be a mine
        let isMine = (Math.random() < minesToPlace/squaresLeft)
        if (isMine) minesToPlace--;
        squaresLeft--;
        boardArray[i][j] = {
          isMine: isMine,
          isFlagged: false,
          isOpened: false,
          px: 0,
          py: 0,
          width: 0,
          height: 0,
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

  measureSquare(event, i, j, ref) {
    this.refs[ref].measure((fx, fy, width, height, px, py) => {
      let newBoard = this.state.boardArray;
      newBoard[i][j] = Object.assign({}, newBoard[i][j],{
        width: width,
        height: height,
        px: px,
        py: py,
      })

      this.setState({
        boardArray: newBoard
      })
    })
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
        flagX: gesture.moveX,
        flagY: gesture.moveY,
      });
      Animated.spring(
        this.state.pan,
        {toValue: {x: 0, y: 0}}
      ).start();}
    });

    // A grid to store all the squares that make up the board
    let theGrid = [];

    // Build the board based on the pun characteristics
    for (let i = 0; i < this.state.boardArray.length; i++) {
      let gridRow = [];

      for (let j = 0; j < this.state.boardArray[i].length; j++) {

        // Generate a unique Ref for this square
        let ref = i + '-' + j;

        // Add a square to the row of squares to display
        gridRow.push(
          <TouchableHighlight
            ref={ref}
            key={ref}
            onPress={() => this.openSquare(i, j)}
            onLayout={(event) => this.measureSquare(event, i, j, ref)}
            underlayColor="#FAEB00"
          >
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