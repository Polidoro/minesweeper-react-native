import React from 'react';
import styles from '../styles';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const Letter = React.createClass({
  getInitialState () {
    return {
      reveal: false,
      theLetter: this.props.theLetter,
    };
  },

  render() {
    const displayCharacter = (this.state.reveal || this.state.theLetter === ' ') ? this.state.theLetter : '_'
    return (
      <TouchableHighlight onPress={() => this.setState({ reveal: true })} disabled={this.state.theLetter === ' '}>
        <Text style={styles.gamePage.answerLetter}>{displayCharacter}</Text>
      </TouchableHighlight>
    )
  }
});

const PunAnswer = React.createClass({
  render() {
    answerArray = [];
    for (var i = 0; i < this.props.theAnswer.length; i++) {
      answerArray.push(<Letter key={i} theLetter={this.props.theAnswer[i]} />)
    }

    return (
      <View style={styles.gamePage.answerText}>
        {answerArray}
      </View>
    );
  }
});

export default PunAnswer;