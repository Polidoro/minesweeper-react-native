import React from 'react';
import styles from '../styles';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const Square = React.createClass({
  getInitialState () {
    return {
      isOpened: this.props.squareData.isOpened,
      isMine: this.props.squareData.isMine,
      isFlagged: this.props.squareData.isFlagged,
    };
  },

  render() {
    const squareData = this.props.squareData;
    let displayCharacter = 'X';
    if (squareData.isOpened && squareData.isMine) {
        displayCharacter = 'M';
    } else if (squareData.isFlagged) {
        displayCharacter = 'F';
    } else if (squareData.isOpened) {
        displayCharacter = ' ';
    }

    return (
      <View style={[styles.gamePage.boardSquare]}>
        <Text style={styles.gamePage.squareLetter}>{displayCharacter}</Text>
      </View>
    )
  }
});

export default Square;