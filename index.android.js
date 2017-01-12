import React, { Component } from 'react';
import styles from './styles';
import MenuPage from './MenuPage';
import EventEmitter from 'wolfy87-eventemitter';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

let rightButtonHandler = new EventEmitter();

export default class PunSweeper extends Component {
  handleRightButtonPress() {
    rightButtonHandler.emitEvent('rightButtonPressed');
  }

  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Initial Scene', index: 0 }}
        renderScene={(route, navigator) =>
          <MenuPage title="menu" navigator={navigator} rightButtonTitle="Instructions" events={rightButtonHandler} />
        }
        style={ styles.global.mainContainer }
      />
    );
  }
}

AppRegistry.registerComponent('PunSweeper', () => PunSweeper);
