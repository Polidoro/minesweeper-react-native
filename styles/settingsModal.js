import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundColor,
    borderColor: colors.borderColor,
    margin: 20,
    padding: 50,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderWidth: .5,
    borderRadius: 10,
  },
  menuButton: {
    backgroundColor: colors.buttonColor,
    borderColor: colors.buttonBorderColor,
    width: 350,
    borderWidth: 1,
    padding: 8,
  },
  disabledButton: {
    opacity: 0.65,
  },
  menuButtonText: {
    color: colors.backgroundColor,
    borderColor: colors.buttonBorderColor,
    fontSize: 46,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuButtonSubtext: {
    color: colors.backgroundColor,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
