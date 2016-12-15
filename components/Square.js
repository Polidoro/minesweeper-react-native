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
    if (squareData.isOpened && squareData.isMine) {
        displayCharacter = 'M';
    } else if (squareData.isFlagged) {
        displayCharacter = 'F';
    } else if (squareData.isOpened && squareData.adjacentMines > 0) {
        displayCharacter = squareData.adjacentMines;
    }

    return (
      <View style={[styles.gamePage.boardSquare, squareData.isOpened && { backgroundColor: '#FCFFF7' }, squareData.isMine && squareData.isOpened && { backgroundColor: '#A72D00' }]}>
        <Text style={styles.gamePage.squareLetter}>{displayCharacter}</Text>
      </View>
    )
  }
});

export default Square;