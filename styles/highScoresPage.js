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
    fontSize: 24,
  },
  instructionalText: {
    marginBottom: 5,
    fontSize: 14,
    color: colors.fontColor,
    textAlign: 'center',
  },
  rowSeparator: {
    backgroundColor: colors.buttonBorderColor,
    height: 1,
    marginLeft: 4,
  },
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 4,
  },
  cellImage: {
    height: 80,
    width: 60,
    marginRight: 8,
    resizeMode: 'contain',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  mediaDescription: {
    fontSize: 12,
    color: '#999',
    flex: 1,
  },
  mediaYear: {
    fontWeight: 'bold',
  },
});