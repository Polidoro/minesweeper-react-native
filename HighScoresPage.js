import React from 'react';
import styles from './styles';
import { puns } from './puns';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  Alert,
  TouchableHighlight,
} from 'react-native';

let HighScore = React.createClass({
  render() {
    return (
      <View>
        <TouchableHighlight key={this.props.question} onPress={() => Alert.alert(this.props.question, this.props.answer)}>
          <Text style={styles.highScoresPage.highScoreText}>{this.props.question}</Text>
        </TouchableHighlight>
        <View style={styles.highScoresPage.rowSeparator} />
      </View>
    )
  }
})

let HighScoresPage = React.createClass({
  getInitialState() {
    return {
      gameswon: this.props.gameswon,
    };
  },

  confirmClearScores() {
    Alert.alert('Are you sure?', 'This will erase all your pun-hunting progress!',
      [
        {text: 'Yes! Wipe my scores!', onPress: () => {
          AsyncStorage.removeItem('gameswon');
          this.setState({ gameswon: [] });
        }},
        {text: 'Nevermind', style: 'cancel'},
      ]
    );
  },

  render() {
    let gameTypes = [];
    for(let gameType in puns) {
      gameTypes.push(
        <View key={gameType}>
          <Text style={styles.highScoresPage.highScoreCategory}>{gameType}</Text>
          <View style={styles.highScoresPage.rowSeparator} />
        </View>);
      puns[gameType].map(game => {
        if(this.state.gameswon.indexOf(game.id) >= 0) {
          gameTypes.push(<HighScore key={game.question} answer={game.answer} question={game.question} />)
        }
      });
    }

    return (
      <ScrollView style={styles.highScoresPage.mainContainer}>
        <Text style={styles.highScoresPage.instructionText}>Tap the pun to see the punchline!</Text>
        <TouchableHighlight disabled={this.state.gameswon.length === 0} onPress={() => this.confirmClearScores()}><Text> Reset scores </Text></TouchableHighlight>
        {gameTypes}
        <Text>{this.state.highScores}</Text>
      </ScrollView>
    );
  }
});

export default HighScoresPage;