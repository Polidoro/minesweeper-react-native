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
      adjacentMines: this.props.squareData.adjacentMines,
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
        displayCharacter = this.state.adjacentMines > 0 ? this.state.adjacentMines : ' ';
    }

    return (
      <View style={[styles.gamePage.boardSquare]}>
        <Text style={styles.gamePage.squareLetter}>{displayCharacter}</Text>
      </View>
    )
  }
});

export default Square;