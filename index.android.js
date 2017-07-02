import React, { Component } from 'react';
import styles from './styles';
import MenuPage from './MenuPage';
import HighScoresPage from './HighScoresPage';
import GamePage from './GamePage';
import EventEmitter from 'wolfy87-eventemitter';
import {
  AppRegistry,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
} from 'react-native';

var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  gestures: {
    pop: null,
  }
});

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

  _configureScene(route) {
    return CustomSceneConfig;
  }

  render() {
    return (
      <Navigator
        renderScene={(route, nav) => this.renderScene(route, nav)}
        style={ styles.global.navBar }
        sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
        configureScene={this._configureScene}
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
        navigationBar={
          <Navigator.NavigationBar
            style={ styles.global.navBar }
            navigationStyles={Navigator.NavigationBar.StylesIOS}
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                { return (
                <TouchableOpacity style={styles.global.navBarLeftButton} onPress={route.onLeftButtonPress}>
                  <Text style={[styles.global.navBarText, styles.global.navBarButtonText]}>{ route.leftButtonTitle }</Text>
                </TouchableOpacity>
                ) },
              RightButton: (route, navigator, index, navState) =>
                { return (
                  <TouchableOpacity style={styles.global.navBarRightButton} onPress={route.onRightButtonPress}>
                    <Text style={[styles.global.navBarText, styles.global.navBarButtonText]}>{ route.rightButtonTitle }</Text>
                  </TouchableOpacity>
                ) },
              Title: (route, navigator, index, navState) =>
                { return <Text  style={[styles.global.navBarText, styles.global.navBarTitleText]}>{route.title}</Text> },
            }}
          />
        }
      />
    );
  }
}

AppRegistry.registerComponent('PunSweeper', () => PunSweeper);
