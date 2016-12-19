import React from 'react';
import styles from './styles';
import { puns } from './puns';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  AlertIOS,
} from 'react-native';

let HighScore = React.createClass({


  render() {
    return (
      <View key={this.props.question}>
        <Text>{this.props.question}</Text>
      </View>
    )
  }
})

let HighScoresPage = React.createClass({
  componentDidMount() {
    this._loadInitialState().done();
  },

  getInitialState() {
    return {
      highScores: 'Loading',
    };
  },

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem('highScores');
      if (value !== null){
        this.setState({highScores: value});
      } else {
        this.setState({highScores: 'NO HIGH SCORES'});
      }
    } catch (error) {
      AlertIOS('ERROR', error.message);
    }
  },

  render() {
    let gameTypes = [];
    for(let gameType in puns) {
      gameTypes.push(<Text style={styles.highScoresPage.highScoreCategory} key={gameType}>{gameType}</Text>);
      puns[gameType].map(game => gameTypes.push(<HighScore key={game.question} question={game.question} />));
    }

    return (
      <ScrollView style={styles.highScoresPage.mainContainer}>
        {gameTypes}
        <Text>{this.state.highScores}</Text>
      </ScrollView>
    );
  }
});

export default HighScoresPage;