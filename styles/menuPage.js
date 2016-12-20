import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FCFFF7',
  },
  menuButton: {
    backgroundColor: '#E53D00',
    width: 350,
    borderColor: '#A72D00',
    borderWidth: 1,
    padding: 8,
  },
  disabledButton: {
    opacity: 0.65,
  },
  menuButtonText: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#FCFFF7',
    textAlign: 'center',
    borderColor: '#A72D00',
  },
  menuButtonSubtext: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FCFFF7',
    textAlign: 'center',
  },
});
