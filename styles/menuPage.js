import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import colors from './colors'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  menuButton: {
    backgroundColor: colors.buttonColor,
    borderColor: colors.buttonBorderColor,
    width: 350,
    borderWidth: 1,
    padding: 8,
  },
  disabledButton: {
    backgroundColor: '#ff9570',
    borderColor: '#a86046'
    // opacity: 0.65,
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
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})
