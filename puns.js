export const puns = {
  easy: [
    {
      question: 'How did I escape Iraq?',
      answer: 'IRAN',
    },
    {
      question: 'What do you call a man with a seagull on his head?',
      answer: 'CLIFF',
    },
    {
      question: 'What\'s the only kind of tea you can\'t have in space?',
      answer: 'GRAVITY',
    },
    {
      question: 'What could you use to split the ocean in two?',
      answer: 'SEA SAW',
    },
    {
      question: 'What\'s brown and sticky?',
      answer: 'A STICK',
    },
  ],
  medium: [
    {
      question: 'What do you call a tree small enough to fit in your hand?',
      answer: 'PALM TREE',
    },
    {
      question: 'Which country has the most birds?',
      answer: 'PORTUGULL',
    },
    {
      question: 'What does a house wear?',
      answer: 'A DRESS',
    },
    {
      question: 'What tunes do ghosts dance to?',
      answer: 'SOUL MUSIC',
    },
    {
      question: 'What do you do when chemists die?',
      answer: 'BARRIUM',
    },
    {
      question: 'Where do polar bears keep thier money?',
      answer: 'SNOW BANK',
    },
    {
      question: 'What do you get when you mix a christmas tree with a pig?',
      answer: 'PORCUPINE',
    },
    {
      question: 'How do billboards communicate with each other?',
      answer: 'SIGN LANGUAGE',
    },
    {
      question: 'Why was the broom late for work?',
      answer: 'IT OVERSWEPT',
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
    {
      question: 'Where should a commander store his armies?',
      answer: 'IN HIS SLEEVIES',
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
export const getNewPun = (gameType, gamesWon, question = null) => {
  const punsToChooseFrom = puns[gameType].filter(pun => !gamesWon.find(gameWon => gameWon.question === pun.question));
  let thePun = punsToChooseFrom[Math.floor(Math.random()*punsToChooseFrom.length)];

  return getPun(question || thePun.question);
}