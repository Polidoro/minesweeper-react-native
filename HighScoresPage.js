import React from 'react';
import GamePage from './GamePage';
import Button from './components/Button';
import styles from './styles';
import { puns } from './puns';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';

let HighScore = React.createClass({
  displayAnswer() {
    Alert.alert(this.props.gameWon.question, this.props.gameWon.answer,[
      {text: 'That\'s HILARIOUS!', style: 'cancel'},
      {text: 'Replay board', onPress: () => this.props.loadGame({gameType: this.props.gameWon.gameType, question: this.props.gameWon.question})},
    ]);
  },

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.displayAnswer}>
          <View style={styles.highScoresPage.cellContainer}>
            <Image
              source={{uri: 'https://betterbusinesslodging.com/web_betterbusinesslodging/wp-content/uploads/2015/07/Easy-Button.png'}}
              style={styles.highScoresPage.cellImage}
            />
            <View style={styles.highScoresPage.cellTextContainer}>
              <Text style={styles.highScoresPage.username} numberOfLines={1}>
                {this.props.gameWon.gameType}
              </Text>
              <Text style={[styles.highScoresPage.questionText, styles.highScoresPage.highScoreText]} numberOfLines={2}>
                {this.props.gameWon.question}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.highScoresPage.rowSeparator} />
      </View>
    )
  }
})

let HighScoresPage = React.createClass({
  componentDidMount() {
    this.props.events.addListener('rightButtonPressed', () => this.confirmClearScores());
  },

  componentWillUnmount() {
    this.props.events.removeEvent();
  },

  confirmClearScores() {
    Alert.alert('Are you sure?', 'This will erase all your pun-sweeping progress!',
      [
        {text: 'Yes! Wipe my scores!', onPress: () => {
          AsyncStorage.removeItem('gamesWon');
          this.props.navigator.pop();
          this.props.reloadInitialState();
        }},
        {text: 'Nevermind', style: 'cancel'},
      ]
    );
  },

  loadGame({gameType, question}) {
    this.props.events.removeEvent();
    this.props.navigator.push({
      title: gameType + ' Game',
      component: GamePage,
      rightButtonTitle: 'Reset',
      onRightButtonPress: this.props.onRightButtonPress,
      leftButtonTitle: 'Menu',
      onLeftButtonPress: () => this.props.navigator.popToTop(0),
      passProps: {
        events: this.props.events,
        gameQuestion: question,
        gameType: gameType,
        gamesWon: this.props.gamesWon,
        reloadInitialState: () => this.props.reloadInitialState(),
      },
    });;
  },

  // Need to fix this reference, then pass highScore object to highscore module
  render() {
    let scores = [];
    this.props.gamesWon.map(gameWon => scores.push(
      <HighScore loadGame={(question) => this.loadGame(question)} key={gameWon.question} gameWon={gameWon} />
    ));

    return (
      <ScrollView style={styles.highScoresPage.mainContainer}>
        <Text style={styles.highScoresPage.instructionalText}>Tap a score to see the punchline!</Text>
        <View style={styles.highScoresPage.rowSeparator} />
        {scores}
      </ScrollView>
    );
  }
});

export default HighScoresPage;