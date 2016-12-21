import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 64,
  },
  board: {
    backgroundColor: colors.backgroundColor,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  boardSquare: {
    backgroundColor: colors.backgroundColor,
    height: 30,
    width: 30,
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: .5,
  },
  boardRow: {
    flexDirection: 'row',
  },
  questionText: {
    margin: 20,
    fontSize: 30,
    textAlign: 'center',
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
    fontSize: 20,
  },
  theFlag: {
    backgroundColor: colors.buttonColor,
    height: 30,
    width: 30,
  },
});
