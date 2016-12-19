export const puns = {
  easy: [
    {
      id: 1,
      boardCols: 6,
      boardRows: 6,
      question: 'How did I escape Iraq?',
      answer: 'IRAN',
    },
    {
      id: 2,
      boardCols: 8,
      boardRows: 8,
      question: 'Which country has the most birds?',
      answer: 'PORTUGULL',
    },
  ],
  medium: [
    {
      id: 3,
      boardCols: 10,
      boardRows: 12,
      question: 'What does a house wear?',
      answer: 'A DRESS',
    },
    {
      id: 4,
      boardCols: 10,
      boardRows: 12,
      question: 'What do you do when chemists die?',
      answer: 'BARRIUM',
    },
  ],
  hard: [
    {
      id: 5,
      boardCols: 11,
      boardRows: 10,
      question: 'What do you call cheese that doesn\'t belong to you?',
      answer: 'NACHO CHEESE',
    },
    {
      id: 6,
      boardCols: 11,
      boardRows: 11,
      question: 'What does it sound like when a piano falls down a mineshaft?',
      answer: 'A FLAT MINER',
    },
    {
      id: 7,
      boardCols: 11,
      boardRows: 12,
      question: 'Why couldn\'t the bicycle go for a ride?',
      answer: 'IT WAS TOO TIRED',
    },
  ],
}

export const getPun = (gameType) => {
  const thePuns = puns[gameType];
  return thePuns[Math.floor(Math.random()*thePuns.length)];
}