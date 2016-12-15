import React from 'react';
import styles from '../styles';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const Letter = React.createClass({
  render() {
    const letterObject = this.props.letterObject;
    let displayCharacter = '_';

    if(letterObject.revealed) {
      displayCharacter = letterObject.wrongLetter || letterObject.actualLetter;
    }

    return <Text style={styles.gamePage.answerLetter}>{displayCharacter}</Text>
  }
});

const PunAnswer = React.createClass({
  render() {
    let letterArray = [];
    this.props.answerArray.map((object, index) => {
      letterArray.push(<Letter key={index} letterObject={object} />)
    })

    return (
      <View style={styles.gamePage.answerText}>
        {letterArray}
      </View>
    );
  }
});

export default PunAnswer;