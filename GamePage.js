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
      gameActive: true,
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

  getPun() {
    const thePuns = puns[this.state.gameType];
    const thePun = thePuns[Math.floor(Math.random()*thePuns.length)];
    return thePun;
  },

  generateBoard(thePun) {
    const mineCount = thePun.answer.replace(/\s/g, '').length;
    let minesToPlace = mineCount;
    let squaresLeft = thePun.boardCols * thePun.boardRows;
    let boardArray = new Array(thePun.boardRows);

    // Build the board based on the pun characteristics
    for (let i = 0; i < thePun.boardRows; i++) {
      boardArray[i] = new Array(thePun.boardCols);

      for (let j = 0; j < thePun.boardCols; j++) {
        // Decide if square should be a mine
        let isMine = (Math.random() < minesToPlace/squaresLeft)
        if (isMine) minesToPlace--;
        squaresLeft--;

        // Store all the data for the square
        boardArray[i][j] = {
          row: i,
          col: j,
          isMine: isMine,
          isFlagged: false,
          isOpened: false,
          adjacentMines: 0,
          adjacentCells: [],
        }
      }
    }

    // For each square check if each adjacent square exists
    boardArray.map(row => row.map(cell => {
      let i = cell.row;
      let j = cell.col;

      if(i > 0 && j > 0) {
        cell.adjacentCells.push({row: i-1, col: j-1})
        if(boardArray[i-1][j-1].isMine) cell.adjacentMines++;
      }

      if(j > 0) {
        cell.adjacentCells.push({row: i, col: j-1})
        if(boardArray[i][j-1].isMine) cell.adjacentMines++;
      }

      if(i < thePun.boardRows-1 && j > 0) {
        cell.adjacentCells.push({row: i+1, col: j-1})
        if(boardArray[i+1][j-1].isMine) cell.adjacentMines++;
      }

      if(i > 0) {
        cell.adjacentCells.push({row: i-1, col: j})
        if(boardArray[i-1][j].isMine) cell.adjacentMines++;
      }

      if(i < thePun.boardRows-1) {
        cell.adjacentCells.push({row: i+1, col: j})
        if(boardArray[i+1][j].isMine) cell.adjacentMines++;
      }

      if(i > 0 && j < thePun.boardCols-1) {
        cell.adjacentCells.push({row: i-1, col: j+1})
        if(boardArray[i-1][j+1].isMine) cell.adjacentMines++;
      }

      if(j < thePun.boardCols-1) {
        cell.adjacentCells.push({row: i, col: j+1})
        if(boardArray[i][j+1].isMine) cell.adjacentMines++;
      }

      if(i < thePun.boardRows-1 && j < thePun.boardCols-1) {
        cell.adjacentCells.push({row: i+1, col: j+1})
        if(boardArray[i+1][j+1].isMine) cell.adjacentMines++;
      }
    }));

    return boardArray;
  },

  componentDidMount() {
    const thePun = this.getPun();
    const boardArray = this.generateBoard(thePun);
    const answerArray = this.generateAnswerArray(thePun.answer);

    this.setState({
      thePun,
      boardArray,
      answerArray,
    });
  },

  generateAnswerArray(answer) {
    answerArray = [];
    for(let i = 0; i < answer.length; i++) {
      answerArray.push({
        wrongLetter: null,
        actualLetter: answer[i],
        revealed: false,
        associatedFlagX: null,
        associatedFlagY: null,
      })
    }

    return answerArray;
  },

  openSquare(i, j) {
    if (!this.state.boardArray[i][j].isOpen && !this.state.boardArray[i][j].isFlagged) {
      let newBoard = this.state.boardArray;
      newBoard[i][j].isOpened = true;

      if(!newBoard[i][j].isMine && newBoard[i][j].adjacentMines === 0) {
        newBoard[i][j].adjacentCells.map(({row, col}) => {
          if(!newBoard[row][col].isOpened) {
            this.openSquare(row, col);
          }
        })
      }

      if(newBoard[i][j].isMine) {
        this.revealMines();
        this.setState({
          gameActive: false,
        });
      }

      this.setState({
        boardArray: newBoard
      });
    }
  },

  revealMines() {
    let newBoard = this.state.boardArray;
    newBoard.map(row => {row.map(cell => {
      if (cell.isMine) cell.isOpened = true;
    })});

    this.setState({
      boardArray: newBoard,
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
      cell.isFlagged = true;
      let newAnswerArray = this.state.answerArray;

      // Pick a random unrevealed letter from the answerArray
      let filteredAnswerArray = answerArray.filter(letterObject => { return !letterObject.revealed})
      let randomLetterIndex = Math.floor(Math.random()*filteredAnswerArray.length)
      newAnswerArray[randomLetterIndex].revealed = true;
      newAnswerArray[randomLetterIndex].associatedFlagY = cell.row;
      newAnswerArray[randomLetterIndex].associatedFlagX = cell.col;

      // if cell is not a mine set a wrongLetter, otherwise clear wrongLetter
      newAnswerArray[randomLetterIndex].wrongLetter = cell.isMine ? null : 'X';

      this.setState({
        answerArray: newAnswerArray,
      });
    }
  },

  render() {
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.state.gameActive,
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
          <TouchableHighlight key={j} onPress={() => this.openSquare(i, j)} underlayColor="#FAEB00" disabled={!this.state.gameActive}>
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
        <View ref='board' style={[styles.gamePage.board, !this.state.gameActive && {backgroundColor: '#A72D00'}]} onLayout={(event) => this.measureBoard(event)}>{theGrid}</View>
        <PunAnswer answerArray={this.state.answerArray} />
        <Animated.View {...panResponder.panHandlers} style={[this.state.pan.getLayout(), styles.gamePage.theFlag]} />
      </View>
    );
  }
});

export default GamePage;