import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.backgroundColor,
  },
  buttonText: {
    backgroundColor: colors.buttonColor,
    borderColor: colors.buttonBorderColor,
    color: colors.backgroundColor,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 1,
    textAlign: 'center',
    borderWidth: 1,
    padding: 8,
  },
});