export const generateBoard = (thePun) => {
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
}

export const generateRandomLetter = (letterToAvoid) => {
  let randomLetter = letterToAvoid;
  const choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  while (randomLetter === letterToAvoid) {
    randomLetter = choices[Math.floor(Math.random() * choices.length)];
  }

  return randomLetter;
}

export const generateAnswerArray = (answer) => {
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
}

export const convertToTime = (number) => {
  const mins = Math.floor(number / 60)
  const secs = (number % 60).toFixed()
  const time = `${ mins < 10 ? '0' : '' }${ mins }:${ secs < 10 ? '0' : '' }${ secs }`
  return (time === 'NaN:NaN' ? '00:00' : time)
}

