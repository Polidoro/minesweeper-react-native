import React from 'react';
import { getPun, getNewPun } from './puns';
import styles from './styles';
import PunAnswer from './components/PunAnswer';
import Square from './components/Square';
import Button from './components/Button';
import FlagCounter from './components/FlagCounter';
import {
  TouchableHighlight,
  Text,
  Linking,
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
      timer: setInterval(() => this.setState({ seconds: this.state.seconds+1}), 1000),
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
        mineCount: 0,
        boardCols: 0,
        boardRows: 0,
        question: '',
        answer: [],
      },
    };
  },

  componentDidMount() {
    const thePun = getNewPun(this.state.gameType, this.props.gamesWon, this.props.question);
    this.setupBoard(thePun);
    this.props.events.addListener('rightButtonPressed', () => this.setupBoard(thePun));
  },

  setupBoard(thePun) {
    this.setState({
      gameState: 'active',
      boardArray: [[]],
      answerArray: [],
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
        let previousgamesWon = JSON.parse(result);
        if(!previousgamesWon) {
          AsyncStorage.setItem('gamesWon', JSON.stringify([this.state.thePun.question]));
        } else {
          AsyncStorage.setItem('gamesWon', JSON.stringify(previousgamesWon.concat([this.state.thePun.question])));
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

      Alert.alert('YOU WIN', this.state.thePun.answer, [{text: 'Awesome!', onPress: () => {
        this.props.navigator.popToTop(0);
        this.props.reloadInitialState();
      }}]);
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
    let newAnswerArray = this.state.answerArray;

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
      answerArray: newAnswerArray,
    });

    this.checkWin()
  },


  get_random_color() {
    function c() {
      var hex = Math.floor(Math.random()*256).toString(16);
      return ("0"+String(hex)).substr(-2); // pad with zero
    }
    return "#"+c()+c()+c();
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
          <Square style={{flex: 1}} key={j} disabled={this.state.gameState !== 'active'} onShortPress={() => this.openSquare(i, j)} onLongPress={() => this.placeFlag(this.state.boardArray[i][j])} squareData={this.state.boardArray[i][j]} />
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
        <PunAnswer answerArray={this.state.answerArray} />
        <Animated.View {...panResponder.panHandlers} style={[this.state.pan.getLayout(), styles.gamePage.theFlag]} />
        <FlagCounter flagsPlaced={this.state.answerArray.filter(letterObject => letterObject.revealed).length} mineCount={this.state.thePun.mineCount} />
        <Text>{convertToTime(this.state.seconds)}</Text>
      </View>
    );
  }
});

export default GamePage;
