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
      row: this.props.row,
      col: this.props.col,
      isOpened: false,
      isMine: this.props.isMine,
      isFlagged: false,
      adjacentMines: this.props.adjacentMines,
    };
  },

  render() {
    let displayCharacter = 'X';
    if (this.state.isOpened && this.state.isMine) {
        displayCharacter = 'M';
    } else if (this.state.isFlagged) {
        displayCharacter = 'F';
    } else if (this.state.isOpened) {
        displayCharacter = ' ';
    }

    return (
      <TouchableHighlight style={[styles.gamePage.boardSquare]} underlayColor="#FAEB00" onPress={() => this.setState({ isOpened: true })}>
        <Text style={styles.gamePage.squareLetter}>{displayCharacter}</Text>
      </TouchableHighlight>
    )
  }
});

export default Square;