import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  navBar: {
    backgroundColor: colors.buttonColor,
  },
  mainContainer: {
    flex: 1,
  },
  navBarText: {
    fontSize: 20,
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
  navBarButtonText: {
    color: colors.backgroundColor,
  },
  navBarTitleText: {
    color: colors.backgroundColor,
    fontWeight: '500',
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
});