import React from 'react';
import Button from './components/Button'
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
  render() {
    return (
      <View key={this.props.question}>
        <TouchableHighlight onPress={() => Alert.alert(this.props.question, this.props.answer)}>
          <View style={styles.highScoresPage.cellContainer}>
            <Image
              source={{uri: 'https://betterbusinesslodging.com/web_betterbusinesslodging/wp-content/uploads/2015/07/Easy-Button.png'}}
              style={styles.highScoresPage.cellImage}
            />
            <View style={styles.highScoresPage.cellTextContainer}>
              <Text style={styles.highScoresPage.username} numberOfLines={1}>
                User's Name - 4:32
              </Text>
              <Text style={[styles.highScoresPage.mediaDescription, styles.highScoresPage.highScoreText]} numberOfLines={2}>
                {this.props.question}
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

  getInitialState() {
    return {
      gameswon: this.props.gameswon,
    };
  },

  confirmClearScores() {
    Alert.alert('Are you sure?', 'This will erase all your pun-sweeping progress!',
      [
        {text: 'Yes! Wipe my scores!', onPress: () => {
          AsyncStorage.removeItem('gameswon');
          this.props.navigator.pop();
          this.props.reloadInitialState();
        }},
        {text: 'Nevermind', style: 'cancel'},
      ]
    );
  },

  render() {
    let scores = [];
    for(let gameType in puns) {
      puns[gameType].map(game => {
        if(this.state.gameswon.indexOf(game.question) >= 0) { 
          scores.push(<HighScore key={game.question} answer={game.answer} question={game.question} />)
        }
      });
    }

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