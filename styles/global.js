import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  navigationBar: {
    height: 40,
    backgroundColor: 'pink',
  },
  navigationBarButton: {
    flex: 1,
  },
  navigationBarButtonText: {
    backgroundColor: 'blue',
    flex: 1,
    color: colors.backgroundColor,
  },
  navigationBarTitleText: {
    flex: 1,
    backgroundColor: 'green',
    color: colors.backgroundColor,
    textAlign: 'center',
    padding: 10,
  },
});