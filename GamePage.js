import React from 'react';
import { getPun } from './puns';
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
  AsyncStorage,
  AlertIOS,
} from 'react-native';
import { generateBoard, generateRandomLetter, generateAnswerArray, checkWin } from './Helpers'

var GamePage = React.createClass({
  getInitialState() {
    return {
      pan: new Animated.ValueXY(),
      gameState: 'active',
      gameType: this.props.gameType,
      boardArray: [[]],
      boardWidth: 0,
      boardHeight: 0,
      boardStartX: 0,
      answerArray: [],
      boardStartY: 0,
      thePun: {
        boardCols: 0,
        boardRows: 0,
        question: '',
        answer: [],
      },
    };
  },

  componentDidMount() {
    const thePun = getPun(this.state.gameType);
    this.setupBoard(thePun);
  },

  setupBoard(thePun) {
    this.setState({
      gameState: 'active',
      boardArray: [[]],
      answerArray: [],
    });

    const boardArray = generateBoard(thePun);
    const answerArray = generateAnswerArray(thePun.answer);

    this.setState({
      thePun,
      boardArray,
      answerArray,
    });
  },

  openSquare(i, j, recursing = false) {
    if (!this.state.boardArray[i][j].isOpen && !this.state.boardArray[i][j].isFlagged) {
      let newBoard = this.state.boardArray;
      newBoard[i][j].isOpened = true;

      if(!newBoard[i][j].isMine && newBoard[i][j].adjacentMines === 0) {
        newBoard[i][j].adjacentCells.map(({row, col}) => {
          if(!newBoard[row][col].isOpened) {
            this.openSquare(row, col, true);
          }
        })
      }

      if(newBoard[i][j].isMine) {
        // Reveal all the mines and set gameState to 'lost'
        this.state.boardArray.map(row => {row.map(cell => cell.isOpened = cell.isOpened || cell.isMine)});
        this.setState({
          gameState: 'lost',
          boardArray: this.state.boardArray,
        });
      }

      this.setState({
        boardArray: newBoard
      });
    }

    if(!recursing) {
      this.checkWin()
    }
  },

  checkWin() {
    let gameWon = true;
    this.state.boardArray.map(row => row.map(cell => {
      // For a player to win every mine must be flagged and every non-mine must be open
      if((cell.isFlagged && !cell.isMine) || (!cell.isOpened && !cell.isMine)) {
        gameWon = false;
      }
    }));

    if(gameWon) {
      AsyncStorage.mergeItem('gameswon', JSON.stringify([this.state.thePun.id]))
      this.setState({gameState: 'won'});
      AlertIOS.alert('YOU WIN', this.state.thePun.answer);
    }
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

  placeFlag(cell) {
    if(cell.isFlagged) {
      cell.isFlagged = false;
      newAnswerArray = this.state.answerArray;
      newAnswerArray.map(letterObject => {
        if(letterObject.associatedFlagX === cell.col && letterObject.associatedFlagY === cell.row) {
          letterObject.revealed = false;
        }
      });

      this.setState({
        answerArray: newAnswerArray,
      });
    } else if(!cell.isOpened) {
      // Pick a random unrevealed letter from the answerArray
      let newAnswerArray = this.state.answerArray;
      let unRevealedSquares = [];

      for(let i = 0; i < answerArray.length; i++) {
        if (!answerArray[i].revealed && answerArray[i].actualLetter !== ' ') unRevealedSquares.push(i);
      }

      if(unRevealedSquares.length > 0) {
        cell.isFlagged = true;

        indexOfSquareToReveal = unRevealedSquares[Math.floor(Math.random()*unRevealedSquares.length)]
        newAnswerArray[indexOfSquareToReveal].revealed = true;
        newAnswerArray[indexOfSquareToReveal].associatedFlagY = cell.row;
        newAnswerArray[indexOfSquareToReveal].associatedFlagX = cell.col;

        // if cell is not a mine set a wrongLetter, otherwise clear wrongLetter
        newAnswerArray[indexOfSquareToReveal].wrongLetter = cell.isMine ? null : generateRandomLetter(newAnswerArray[indexOfSquareToReveal].actualLetter);
      }

      this.setState({
        answerArray: newAnswerArray,
      });
    }

    this.checkWin()
  },

  render() {
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.state.gameState === 'active',
      onPanResponderMove: Animated.event([null,{
        dx : this.state.pan.x,
        dy : this.state.pan.y
      }]),

      onPanResponderRelease: (e, gesture) => {
        let newBoard = this.state.boardArray
        let xWithRespectToBoard = (gesture.moveX - this.state.boardStartX);
        let yWithRespectToBoard = (gesture.moveY - this.state.boardStartY);

        if(xWithRespectToBoard > 0 && xWithRespectToBoard < this.state.boardWidth && yWithRespectToBoard > 0 && yWithRespectToBoard < this.state.boardHeight) {
          this.placeFlag(newBoard[Math.floor(yWithRespectToBoard / (this.state.boardHeight / this.state.thePun.boardRows))][Math.floor(xWithRespectToBoard / (this.state.boardWidth / this.state.thePun.boardCols))]);
          this.setState({ theBoard: newBoard })
        }

        Animated.spring(
          this.state.pan,
          {toValue: {x: 0, y: 0}}
        ).start()
      }
    });

    // Build the board based on the pun characteristics
    let theGrid = [];
    for (let i = 0; i < this.state.boardArray.length; i++) {
      let gridRow = [];

      for (let j = 0; j < this.state.boardArray[i].length; j++) {
        gridRow.push(
          <TouchableHighlight key={j} onPress={() => this.openSquare(i, j)} underlayColor="#FAEB00" disabled={this.state.gameState !== 'active'}>
            <View><Square squareData={this.state.boardArray[i][j]} /></View>
          </TouchableHighlight>
        )
      }

      // Add the row to the grid of squares to display
      theGrid.push(<View style={styles.gamePage.boardRow} key={i}>{gridRow}</View>);
    }

    AsyncStorage.setItem('highScores', this.state.gameType);

    return (
      <View style={styles.gamePage.mainContainer}>
        <Text style={styles.gamePage.questionText}>{this.state.thePun.question}</Text>
        <View ref='board' style={[styles.gamePage.board, (this.state.gameState === 'lost') && {backgroundColor: '#A72D00'}]} onLayout={(event) => this.measureBoard(event)}>{theGrid}</View>
        <PunAnswer answerArray={this.state.answerArray} />
        <Animated.View {...panResponder.panHandlers} style={[this.state.pan.getLayout(), styles.gamePage.theFlag]} />
        <TouchableHighlight onPress={() => this.setupBoard(this.state.thePun)}>
          <Text style={styles.gamePage.resetButton}> Reset Board </Text>
        </TouchableHighlight>
      </View>
    );
  }
});

export default GamePage;