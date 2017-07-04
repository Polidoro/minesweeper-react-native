import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  board: {
    flex: 5,
    zIndex: 100,
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
    borderWidth: 1,
    alignItems: 'center',
  },
  boardRow: {
    flexDirection: 'row',
  },
  questionText: {
    color: colors.fontColor,
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
  },
  answerText: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  letterString: {
    color: 'black',
    letterSpacing: 10,
    textAlign: 'center',
    minWidth: 18,
    fontSize: 26,
  },
  squareLetter: {
    color: 'black',
    padding: 1,
    opacity: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  flagImage: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
  },
  flagInfo: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagInstructions: {
    color: colors.inactiveFontColor,
    fontSize: 18,
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
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 60,
    height: 60,
  },
  cellImage: {
    resizeMode: 'contain',
    flex: 1,
  },
});
