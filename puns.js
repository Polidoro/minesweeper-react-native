export const puns = {
  easy: [
    {
      boardCols: 6,
      boardRows: 6,
      question: 'How did I escape Iraq?',
      answer: 'IRAN',
    },
    {
      boardCols: 8,
      boardRows: 8,
      question: 'Which country has the most birds?',
      answer: 'PORTUGULL',
    },
  ],
  medium: [
    {
      boardCols: 10,
      boardRows: 12,
      question: 'What does a house wear?',
      answer: 'A DRESS',
    },
    {
      boardCols: 10,
      boardRows: 12,
      question: 'What do you do when chemists die?',
      answer: 'BARRIUM',
    },
  ],
  hard: [
    {
      boardCols: 11,
      boardRows: 10,
      question: 'What do you call cheese that doesn\'t belong to you?',
      answer: 'NACHO CHEESE',
    },
    {
      boardCols: 11,
      boardRows: 11,
      question: 'What does it sound like when a piano falls down a mineshaft?',
      answer: 'A FLAT MINER',
    },
    {
      boardCols: 11,
      boardRows: 12,
      question: 'Why couldn\'t the bicycle go for a ride?',
      answer: 'IT WAS TOO TIRED',
    },
  ],
}

// Grabs a pun that hasn't been completed, calculates appropriate size and return it
export const getPun = (gameType, gameswon) => {
  const punsToChooseFrom = puns[gameType].filter(pun => gameswon.indexOf(pun.id) < 0);
  let thePun = punsToChooseFrom[Math.floor(Math.random()*punsToChooseFrom.length)];
  return thePun;
}