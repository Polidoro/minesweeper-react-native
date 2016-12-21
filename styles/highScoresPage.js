import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundColor,
    margin: 20,
    flex: 1,
    flexDirection: 'column',
  },
  highScoreCategory: {
    paddingTop: 10,
    fontSize: 44,
    fontWeight: 'bold',
  },
  highScoreText: {
    fontSize: 24,
  },
  instructionText: {
    fontSize: 30,
    color: 'red',
    textAlign: 'center',
  },
  rowSeparator: {
    backgroundColor: colors.buttonBorderColor,
    height: 1,
    marginLeft: 4,
  },
});