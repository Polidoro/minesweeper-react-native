import React, { Component } from 'react';
import styles from './styles';
import MenuPage from './MenuPage';
import EventEmitter from 'wolfy87-eventemitter';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

let rightButtonHandler = new EventEmitter();

export default class PunSweeper extends Component {
  handleRightButtonPress() {
    rightButtonHandler.emitEvent('rightButtonPressed');
  }

  render() {
    return (
      <NavigatorIOS
        style={ styles.global.mainContainer }
        barTintColor='#FC2F00'
        tintColor='#EFEFEF'
        titleTextColor='#FCFFF7'
        translucent={false}
        initialRoute={{
          component: MenuPage,
          title: 'Menu',
          rightButtonTitle: 'Instructions',
          onRightButtonPress: () => this.handleRightButtonPress(),
          passProps: {
            events: rightButtonHandler
          },
        }}
      />
    );
  }
}

AppRegistry.registerComponent('PunSweeper', () => PunSweeper);
