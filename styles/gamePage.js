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
    flexDirection: 'row',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: .5,
    alignItems: 'center',
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
    justifyContent: 'center',
  },
  answerLetter: {
    padding: 3,
    minWidth: 20,
    fontSize: 28,
  },
  squareLetter: {
    padding: 1,
    opacity: 1,
    fontSize: 20,
    textAlign: 'center',
  },
  flagImage: {
    resizeMode: 'contain',
  },
  timerText: {
    minWidth: 40,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4
  },
  theFlag: {
    height: 30,
    width: 30,
    zIndex: 1000,
  },
  cellImage: {
    resizeMode: 'contain',
    flex: 1,
  },
});
