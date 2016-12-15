import React from 'react';
import styles from '../styles';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const Letter = React.createClass({
  render() {
    const displayCharacter = this.props.displayLetter ? this.props.displayLetter : this.props.theLetter;
    return <Text style={styles.gamePage.answerLetter}>{displayCharacter}</Text>
  }
});

const PunAnswer = React.createClass({
  render() {
    answerArray = [];
    for (var i = 0; i < this.props.theAnswer.length; i++) {
      answerArray.push(<Letter key={i} displayLetter={this.props.revealedLetters[i]} theLetter={this.props.theAnswer[i]} />)
    }

    return (
      <View style={styles.gamePage.answerText}>
        {answerArray}
      </View>
    );
  }
});

export default PunAnswer;