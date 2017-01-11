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
    color: colors.fontColor,
    fontSize: 28,
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
    width: 60,
    height: 60,
  },
  flagInfo: {
    flex: 1,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagInstructions: {
    color: colors.inactiveFontColor,
    flex: 5,
    textAlign: 'right',
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
    width: 60,
    height: 60,
    borderWidth: 1,
    borderStyle: 'dashed',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellImage: {
    resizeMode: 'contain',
    flex: 1,
  },
});
