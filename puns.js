export const puns = {
  easy: [
    {
      question: 'What kind of shirts do golfers wear?',
      answer: 'TEE SHIRTS',
    },
    {
      question: 'How did I escape Iraq?',
      answer: 'IRAN',
    },
    {
      question: 'What\'s exactly one foot long and slippery?',
      answer: 'A SLIPPER',
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
    {
      question: 'What\'s the best way to organize an Earth party?',
      answer: 'PLANET',
    },
    {
      question: 'What do you call a bear with no teeth?',
      answer: 'GUMMY BEAR',
    },
    {
      question: 'What do you call a fish with no eyes?',
      answer: 'FSH',
    },
    {
      question: 'What did the pirate say on his eightieth birthday?',
      answer: 'AYE MATEY',
    },
    {
      question: 'Where do horses buy their clothes?',
      answer: 'OLD NEIGHVY',
    },
    {
      question: 'What do you call a cow with two legs?',
      answer: 'LEAN BEEF',
    },
    {
      question: 'What did the cobbler say when when a cat wandered in?',
      answer: 'SHOE',
    },
  ],
  medium: [
    {
      question: 'Why is it a bad idea to eat a clown?',
      answer: 'THEY TASTE FUNNY',
    },
    {
      question: 'What do you call a deer without any eyeballs?',
      answer: 'NO EYE DEER',
    },
    {
      question: 'Why didn\'t the ocean say anything to the beach?',
      answer: 'IT JUST WAVED',
    },
    {
      question: 'What do you use to fix a train with a hearing problem?',
      answer: 'AN ENGINEER',
    },
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
    {
      question: 'Why did the cookie go to the hospital?',
      answer: 'HE FELT CRUMMY',
    },
    {
      question: 'What happens when a frog\'s car breaks down?',
      answer: 'IT GETS TOAD',
    },
    {
      question: 'What do you call a cow with a great sense of humor?',
      answer: 'LAUGHING STOCK',
    },
  ],
  hard: [
    {
      question: 'Why shouldn\'t you trust atoms?',
      answer: 'THEY MAKE UP EVERYTHING',
    },
    {
      question: 'What do hermit crabs and turtles use to communicate?',
      answer: 'SHELLULAR PHONES',
    },
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
    {
      question: 'What do peppers do when they\'re mad?',
      answer: 'GET JALAPENO FACE',
    },
    {
      question: 'What\'s the best part about corduroy pillows?',
      answer: 'THEY MAKE HEADLINES',
    },
    {
      question: 'If you read ten puns, how many made you laugh?',
      answer: 'NO PUN IN TEN DID',
    },
    {
      question: 'What do you call a theatrical performance about puns?',
      answer: 'A PLAY ON WORDS',
    },
    {
      question: 'Why didn\'t it hurt when you were hit with a soda?',
      answer: 'IT WAS A SOFT DRINK',
    },
    {
      question: 'Why are pirates so mean?',
      answer: 'THEY JUST ARRR',
    },
    {
      question: 'What did the big bucket say to the little bucket?',
      answer: 'YOU LOOK A LITTLE PAIL',
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