import React from 'react';
import styles from './styles';
import HighScoresPage from './HighScoresPage';
import GamePage from './GamePage';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  Linking,
  View,
} from 'react-native';

var MenuPage = React.createClass({
  pushGamePage(title, gameType) {
    this.props.navigator.push({
      title: title,
      component: GamePage,
      passProps: { gameType: gameType }
    });
  },

  pushHighScoresPage() {
    this.props.navigator.push({
      title: 'High Scores',
      component: HighScoresPage,
    });
  },

  render() {
    return (
      <View style={styles.menuPage.mainContainer}>
        <View></View>
        <View></View>
        <TouchableHighlight onPress={() => this.pushGamePage('Easy Game', 'easy')}>
          <Text style={styles.menuPage.menuButton}>
            Easy Mode
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.pushGamePage('Medium Game', 'medium')}>
          <Text style={styles.menuPage.menuButton}>
            Medium
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.pushGamePage('Hard Game', 'hard')}>
          <Text style={styles.menuPage.menuButton}>
            Hard Mode
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