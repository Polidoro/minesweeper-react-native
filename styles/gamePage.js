import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    paddingTop: 64,
  },
  board: {
    flex: 5,
    backgroundColor: colors.backgroundColor,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  boardSquare: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: .5,
  },
  boardRow: {
    flexDirection: 'row',
  },
  questionText: {
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },
  answerText: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  answerLetter: {
    padding: 3,
    fontSize: 40,
  }, 
  squareLetter: {
    padding: 1,
    opacity: 1,
    fontSize: 20,
    textAlign: 'center',
  },
  theFlag: {
    backgroundColor: colors.buttonColor,
    height: 30,
    width: 30,
  },
});
