import React from 'react';
import { getPun, getNewPun } from './puns';
import styles from './styles';
import PunAnswer from './components/PunAnswer';
import Square from './components/Square';
import Button from './components/Button';
import FlagCounter from './components/FlagCounter';
import Flag from './components/Flag';
import arrowImage from './images/arrow.png';
import {
  TouchableHighlight,
  Text,
  Image,
  View,
  PanResponder,
  Animated,
  Dimensions,
  AsyncStorage,
  Alert,
} from 'react-native';
import { generateBoard, generateRandomLetter, generateAnswerArray, checkWin, convertToTime } from './Helpers'

var GamePage = React.createClass({
  getInitialState() {
    return {
      seconds: 0,
      highlightedX: null,
      highlightedY: null,
      timer: setInterval(() => { if (this.state.gameState === 'active') this.setState({ seconds: this.state.seconds+1}) }, 1000),
      gameState: 'active',
      boardArray: [[]],
      answerArray: [],
      boardMeasurements: { boardWidth: 0, boardHeight: 0, boardStartX: 0, boardStartY: 0, },
      thePun: { mineCount: 0, boardCols: 0, boardRows: 0, question: '', answer: [], },
    };
  },

  componentDidMount() {
    const thePun = getNewPun(this.props.gameType, this.props.gamesWon, this.props.gameQuestion);
    this.setupBoard(thePun);
    this.props.events.addListener('rightButtonPressed', () => this.setupBoard(thePun));
  },

  setupBoard(thePun) {
    this.setState({
      gameState: 'active',
      boardArray: [[]],
      answerArray: [],
      seconds: 0,
    });

    let boardArray = generateBoard(thePun);
    let answerArray = generateAnswerArray(thePun.answer);

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

  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.props.events.removeEvent();
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
      AsyncStorage.getItem('gamesWon', (error, result) => {
        let previousGamesWon = JSON.parse(result);
        let newScore = {
            question: this.state.thePun.question,
            answer: this.state.thePun.answer,
            time: this.state.seconds,
            date: Date(),
            gameType: this.props.gameType
          }
        if(!previousGamesWon) { // No gamesWon, so create a new array and store it
          AsyncStorage.setItem('gamesWon', JSON.stringify([newScore]));
        } else if(!previousGamesWon.find(gameWon => gameWon.question === this.state.thePun.question)) {
          // This is the first high score for the qustion, add it
          AsyncStorage.setItem('gamesWon', JSON.stringify(previousGamesWon.concat([newScore])));
        } else {
          previousGamesWon.map((gameWon, index) => { // Update existing high score, if necessary
            if(gameWon.question === this.state.thePun.question && gameWon.time > newScore.time) {
              previousGamesWon[index] = newScore;
              AsyncStorage.setItem('gamesWon', JSON.stringify(previousGamesWon));
            }
          });
        }
      });

      this.state.answerArray.map(letterObject => {
        letterObject.revealed = true;
        letterObject.wrongLetter = null;
      });
      this.state.boardArray.map(row => row.map(cell => cell.isFlagged = cell.isMine));

      this.setState({ 
        answerArray: this.state.answerArray,
        boardArray: this.state.boardArray,
        gameState: 'won',
      });

      Alert.alert('YOU WIN', '', [{text: 'Awesome!', onPress: () => {
        this.props.navigator.popToTop(0);
        this.props.reloadInitialState();
      }}]);
    }
  },

  measureBoard(event) {
    this.refs['board'].measure((fx, fy, width, height, px, py) => {
      this.setState({
        boardMeasurements: {
          boardWidth: width,
          boardHeight: height,
          boardStartX: px,
          boardStartY: py,
        },
      });
    });
  },

  highlightCell(i, j) {
    this.setState({
      highlightedX: j,
      highlightedY: i,
    });
  },

  placeFlag(i, j) {
    let newAnswerArray = this.state.answerArray;

    let cell = this.state.boardArray[i][j];
    // If cell is flagged unflag it
    if(cell.isFlagged) {
      cell.isFlagged = false;
      newAnswerArray.map(letterObject => {
        if(letterObject.associatedFlagX === cell.col && letterObject.associatedFlagY === cell.row) {
          letterObject.revealed = false;
        }
      });
    } else if(this.state.answerArray.filter(letterObject => letterObject.revealed === true).length >= this.state.thePun.answer.replace(/\s/g, '').length) {
      // If cell is NOT flagged, check if all the possible flags are currently placed
      Alert.alert('Uh oh!', 'You cannot place any more flags, try removing one first!');
    } else if(!cell.isOpened) {
      cell.isFlagged = true;

      // Check if that square has had a flag placed on it previously
      if(newAnswerArray.find(letterObject => letterObject.associatedFlagX === cell.col && letterObject.associatedFlagY === cell.row)) {
        newAnswerArray.find(letterObject => letterObject.associatedFlagX === cell.col && letterObject.associatedFlagY === cell.row).revealed = true;
      } else {
        // Pick a random unrevealed letter from the answerArray
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
      }
    }

    this.setState({
      boardArray: this.state.boardArray,
      answerArray: newAnswerArray,
    });

    this.checkWin()
  },

  render() {
    // Build the board based on the pun characteristics
    let theGrid = [];
    for (let i = 0; i < this.state.boardArray.length; i++) {
      let gridRow = [];

      for (let j = 0; j < this.state.boardArray[i].length; j++) {
        gridRow.push(
          <Square style={{flex: 1}} highlighted={(this.state.highlightedY === i && this.state.highlightedX === j)} key={j}
            disabled={this.state.gameState !== 'active'}
            onShortPress={() => this.openSquare(i, j)}
            squareData={this.state.boardArray[i][j]}
            onPressIn={() => this.highlightCell(i, j)}
            onPressOut={() => this.highlightCell(null, null)}
            onLongPress={() => { 
              this.highlightCell(null, null);
              this.placeFlag(i, j);
            }}
          />
        )
      }

      // Add the row to the grid of squares to display
      theGrid.push(<View style={{flexDirection: 'row', flex: 1}} key={i}>{gridRow}</View>);
    }

    return (
      <View style={styles.gamePage.mainContainer}>
        <Text style={styles.gamePage.questionText}>{this.state.thePun.question}</Text>
        <View style={{flexDirection: 'row', height: this.state.boardArray.length * Dimensions.get('window').width / this.state.boardArray[0].length, backgroundColor: 'steelblue'}}>
          <View ref='board' onLayout={(event) => this.measureBoard(event)} style={{ flexDirection: 'column', flex: 1 }}>
            {theGrid}
          </View>
        </View>
        <View style={styles.gamePage.gameInfo}>
          <FlagCounter flagsPlaced={this.state.answerArray.filter(letterObject => letterObject.revealed).length} mineCount={this.state.thePun.mineCount} />
          <Text style={styles.gamePage.timerText}>{convertToTime(this.state.seconds)}</Text>
        </View>
        <PunAnswer style={{ flex: 1 }} answerArray={this.state.answerArray} />
        <View style={styles.gamePage.flagInfo}>
          <Text style={styles.gamePage.flagInstructions}>(Drag and drop to add or remove flags)</Text>
          <Image source={arrowImage} style={{height: 20, width: 26}} />
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Flag highlightCell={this.highlightCell} gameState={this.state.gameState} boardMeasurements={this.state.boardMeasurements} thePun={this.state.thePun} placeFlag={this.placeFlag} />
          </View>
        </View>
      </View>
    );
  }
});

export default GamePage;
