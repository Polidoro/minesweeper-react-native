import React from 'react';
import styles from '../styles';
import colors from '../styles/colors';
import {
  TouchableWithoutFeedback ,
  View,
  Text,
} from 'react-native';

const Square = React.createClass({
  render() {
    const squareData = this.props.squareData;
    let displayCharacter = ' ';
    let squareColor = colors.cellColor;

    if (squareData.isOpened && squareData.isMine) {
        displayCharacter = 'M';
        squareColor = colors.buttonColor
    } else if (squareData.isFlagged) {
        displayCharacter = 'F';
        squareColor = colors.cellDarkColor;
    } else if (squareData.isOpened) {
        displayCharacter = squareData.adjacentMines;
        squareColor = colors.backgroundColor;
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