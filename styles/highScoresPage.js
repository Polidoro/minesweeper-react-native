import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    margin: 20,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FCFFF7',
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
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
    marginLeft: 4,
  },
});