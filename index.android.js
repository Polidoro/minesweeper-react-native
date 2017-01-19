import React, { Component } from 'react';
import styles from './styles';
import MenuPage from './MenuPage';
import HighScoresPage from './HighScoresPage';
import GamePage from './GamePage';
import EventEmitter from 'wolfy87-eventemitter';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
} from 'react-native';

let rightButtonHandler = new EventEmitter();

export default class PunSweeper extends Component {
  handleRightButtonPress() {
    rightButtonHandler.emitEvent('rightButtonPressed');
  }

  renderScene(route,nav) {
    let pageContent = <View />

    switch (route.componentName) {
      case 'GamePage':
        pageContent = <GamePage {...route.passProps} navigator={nav} />
        break;
      case 'MenuPage':
        pageContent = <MenuPage {...route.passProps} navigator={nav} />
        break;
      case 'HighScoresPage':
        pageContent = <HighScoresPage {...route.passProps} navigator={nav} />
        break;
    }

    return pageContent
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          component: MenuPage,
          componentName: 'MenuPage',
          title: 'Menu',
          rightButtonTitle: 'Instructions',
          onRightButtonPress: () => this.handleRightButtonPress(),
          passProps: {
            events: rightButtonHandler
          }
        }}
        renderScene={(route, nav) => this.renderScene(route, nav)}
        style={ styles.global.mainContainer }
         navigationBar={
         <Navigator.NavigationBar
           routeMapper={{
             LeftButton: (route, navigator, index, navState) =>
               { return (
                <TouchableHighlight style={styles.global.navigationBarButton} onPress={route.onLeftButtonPress}>
                  <Text style={styles.global.navigationBarButtonText}>{ route.leftButtonTitle }</Text>
                </TouchableHighlight>
                ) },
             RightButton: (route, navigator, index, navState) =>
               { return (
                  <TouchableHighlight onPress={route.onRightButtonPress}>
                    <Text style={styles.global.navigationBarButtonText}>{ route.rightButtonTitle }</Text>
                  </TouchableHighlight>
                ) },
             Title: (route, navigator, index, navState) =>
               { return <Text style={styles.global.navigationBarTitleText}>{route.title}</Text> },
           }}
           style={styles.global.navigationBar}
         />
        }
      />
    );
  }
}

AppRegistry.registerComponent('PunSweeper', () => PunSweeper);
