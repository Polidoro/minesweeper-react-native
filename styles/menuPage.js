import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import colors from './colors'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuButton: {
    backgroundColor: colors.buttonColor,
    borderColor: colors.buttonBorderColor,
    width: 330,
    borderWidth: 1,
    paddingBottom: 8,
    marginHorizontal: 80,
    shadowColor: colors.darkGrey,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {width: 3, height: 3}
  },
  disabledButton: {
    backgroundColor: colors.disabledButtonColor,
    borderColor: colors.disabledButtonBorderColor
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
    padding: 8
  }
})
