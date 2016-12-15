import React from 'react';
import styles from '../styles';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const Square = React.createClass({
  render() {
    const squareData = this.props.squareData;
    let displayCharacter = ' ';
    let squareColor = '#CBE896';

    if (squareData.isOpened && squareData.isMine) {
        displayCharacter = 'M';
        squareColor = '#A72D00'
    } else if (squareData.isFlagged) {
        displayCharacter = 'F';
        squareColor = '#A7BE7B';
    } else if (squareData.isOpened) {
        displayCharacter = squareData.adjacentMines;
        squareColor = '#FCFFF7';
    }

    return (
      <View style={[styles.gamePage.boardSquare, { backgroundColor: squareColor }]}>
        <Text style={styles.gamePage.squareLetter}>{displayCharacter === 0 ? ' ' : displayCharacter}</Text>
      </View>
    )
  }
});

export default Square;