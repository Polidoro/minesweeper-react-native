import React from 'react';
import styles from '../styles';
import {
  Text,
  TouchableWithoutFeedback ,
  View,
  Animated,
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
      <TouchableWithoutFeedback
        onLongPress={this.props.onLongPress}
        onPress={this.props.onShortPress}
        disabled={this.props.disabled}
      >
        <View style={[styles.gamePage.boardSquare, { backgroundColor: squareColor }]}>
          <Text style={styles.gamePage.squareLetter}>
            {displayCharacter === 0 ? ' ' : displayCharacter}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
});

export default Square;