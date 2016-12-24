export const puns = {
  easy: [
    {
      question: 'How did I escape Iraq?',
      answer: 'IRAN',
    },
    {
      question: 'Which country has the most birds?',
      answer: 'PORTUGULL',
    },
  ],
  medium: [
    {
      question: 'What does a house wear?',
      answer: 'A DRESS',
    },
    {
      question: 'What do you do when chemists die?',
      answer: 'BARRIUM',
    },
  ],
  hard: [
    {
      question: 'What do you call cheese that doesn\'t belong to you?',
      answer: 'NACHO CHEESE',
    },
    {
      question: 'What does it sound like when a piano falls down a mineshaft?',
      answer: 'A FLAT MINER',
    },
    {
      question: 'Why couldn\'t the bicycle go for a ride?',
      answer: 'IT WAS TOO TIRED',
    },
  ],
}

// Grabs a specific pun based on the question sent
export const getPun = (punQuestion) => {
  let thePun = [].concat(puns['easy'],puns['medium'],puns['hard']).find(pun => pun.question === punQuestion)

  const mineCount = thePun.answer.replace(/\s/g, '').length;
  const cellCount = mineCount * 6;
  const boardRows = Math.floor(Math.sqrt(cellCount));
  const boardCols = boardRows + 1;

  thePun.boardCols = boardCols;
  thePun.boardRows = boardRows;
  thePun.mineCount = mineCount;

  return thePun;
}

// Grabs a pun that hasn't been completed, calculates appropriate size and return it
export const getNewPun = (gameType, gameswon, question) => {
  const punsToChooseFrom = puns[gameType].filter(pun => gameswon.indexOf(pun.question) < 0);
  let thePun = punsToChooseFrom[Math.floor(Math.random()*punsToChooseFrom.length)];

  return getPun(question || thePun.question);
}