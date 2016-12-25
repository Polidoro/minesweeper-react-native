import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundColor,
    margin: 5,
    flex: 1,
    flexDirection: 'column',
  },
  highScoreCategory: {
    paddingTop: 10,
    fontSize: 44,
    fontWeight: 'bold',
  },
  highScoreText: {
    color: colors.fontColor,
    fontSize: 16,
    flex: 1,
  },
  instructionalText: {
    color: colors.fontColor,
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  rowSeparator: {
    backgroundColor: colors.buttonBorderColor,
    height: 1,
    marginLeft: 4,
  },
  cellTextContainer: {
    flex: 5,
    flexDirection: 'column',
  },
  cellContainer: {
    backgroundColor: colors.backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  cellImage: {
    height: 80,
    marginRight: 8,
    resizeMode: 'contain',
    flex: 1,
  },
  cellTextHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
});