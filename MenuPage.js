import React from 'react';
import styles from './styles';
import HighScoresPage from './HighScoresPage';
import GamePage from './GamePage';
import { puns } from './puns';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  View,
  AsyncStorage,
} from 'react-native';

var MenuPage = React.createClass({
  componentDidMount() {
    this._loadInitialState().done();
  },

  getInitialState() {
    return {
      gameswon: [],
    };
  },

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem('gameswon');
      if (value !== null){
        this.setState({
          gameswon: JSON.parse(value)
        });
      }
    } catch (error) {
      Alert.alert('ERROR', error.message);
    }
  },

  pushGamePage(title, gameType) {
    this.props.navigator.push({
      title: title,
      component: GamePage,
      passProps: { gameType: gameType },
    });
  },

  pushHighScoresPage() {
    this.props.navigator.push({
      title: 'High Scores',
      component: HighScoresPage,
    });
  },

  render() {
    const easyPunsCompleted = puns['easy'].filter(pun => this.state.gameswon.indexOf(pun.id) >= 0).length + '/' + puns['easy'].length;
    const mediumPunsCompleted = puns['medium'].filter(pun => this.state.gameswon.indexOf(pun.id) >= 0).length + '/' + puns['medium'].length;
    const hardPunsCompleted = puns['hard'].filter(pun => this.state.gameswon.indexOf(pun.id) >= 0).length + '/' + puns['hard'].length;
    return (
      <View style={styles.menuPage.mainContainer}>
        <View></View>
        <View></View>
        <TouchableHighlight onPress={() => this.pushGamePage('Easy Game', 'easy')}>
          <Text style={styles.menuPage.menuButton}>
            Easy Mode {easyPunsCompleted}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.pushGamePage('Medium Game', 'medium')}>
          <Text style={styles.menuPage.menuButton}>
            Medium {mediumPunsCompleted}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.pushGamePage('Hard Game', 'hard')}>
          <Text style={styles.menuPage.menuButton}>
            Hard Mode {hardPunsCompleted}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.pushHighScoresPage()}>
          <Text style={styles.menuPage.menuButton}>
            High Scores
          </Text>
        </TouchableHighlight>
        <View></View>
      </View>
    );
  }
});

export default MenuPage;