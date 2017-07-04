import React from 'react';
import styles from '../styles';
import { Text, View, Platform } from 'react-native';

const PunAnswer = React.createClass({
  calculateLetter(letterObject) {
    let displayCharacter = (letterObject.actualLetter === ' ') ? ' ' : '_';

    if(letterObject.revealed) {
      displayCharacter = letterObject.wrongLetter || letterObject.actualLetter;
    }

    return displayCharacter;
  },

  render() {
    let letterArray = [];
    let letterString = '';
    this.props.answerArray.map((object, index) => {
      letterString = letterString.concat(this.calculateLetter(object))
    })

    return (
      <View style={styles.gamePage.answerText}>
        <Text style={styles.gamePage.letterString}>{(Platform.OS === 'ios') ? letterString : letterString.split('').join('\u200A')}</Text>
      </View>
    );
  }
});

export default PunAnswer;