import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundColor,
    borderColor: colors.borderColor,
    margin: 20,
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderWidth: .5,
    borderRadius: 1,
    shadowColor: colors.darkGrey,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {width: 3, height: 3}
  },
  headerText: {
    color: colors.fontColor,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentText: {
    textAlign: 'center',
    color: colors.fontColor,
    fontSize: 20,
    fontWeight: 'bold'
  },
});
