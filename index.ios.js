/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from './styles';
import MenuPage from './MenuPage';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  NavigatorIOS,
  AlertIOS
} from 'react-native';

export default class sandbox extends Component {
  render() {
    return (
      <NavigatorIOS
        style={ styles.global.mainContainer }
        barTintColor='#FC2F00'
        tintColor='#EFEFEF'
        titleTextColor='#FCFFF7'
        initialRoute={{
          component: MenuPage,
          title: 'Menu',
          onRightButtonPress: () => AlertIOS.alert('Hello','This is an alert')
        }}
      />
    );
  }
}

AppRegistry.registerComponent('sandbox', () => sandbox);
