import React from 'react';
import styles from './styles';
import { puns } from './puns';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  AlertIOS,
  TouchableHighlight,
} from 'react-native';

let HighScore = React.createClass({
  render() {
    return (
      <TouchableHighlight key={this.props.question} onPress={() => AlertIOS.alert(this.props.question, this.props.answer)}>
        <Text style={styles.highScoresPage.highScoreText}>{this.props.question}</Text>
      </TouchableHighlight>
    )
  }
})

let HighScoresPage = React.createClass({
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
      AlertIOS.alert('ERROR', error.message);
    }
  },

  render() {
    let gameTypes = [];
    for(let gameType in puns) {
      gameTypes.push(<Text style={styles.highScoresPage.highScoreCategory} key={gameType}>{gameType}</Text>);

      puns[gameType].map(game => {
        if(this.state.gameswon.indexOf(game.id) >= 0) {
          gameTypes.push(<HighScore key={game.question} answer={game.answer} question={game.question} />)
        }
      });
    }

    return (
      <ScrollView style={styles.highScoresPage.mainContainer}>
        <Text style={styles.highScoresPage.instructionText}>Tap the pun to see the punchline!</Text>
        <TouchableHighlight onPress={() => AsyncStorage.removeItem('gameswon')}><Text> Reset scores </Text></TouchableHighlight>
        {gameTypes}
        <Text>{this.state.highScores}</Text>
      </ScrollView>
    );
  }
});

export default HighScoresPage;