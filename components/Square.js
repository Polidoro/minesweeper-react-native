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
      opened: false,
      isMine: this.props.isMine,
      adjacentMines: this.props.adjacentMines,
    };
  },

  render() {
    const displayCharacter = this.state.isMine ? 'M' : '';
    return (
      <TouchableHighlight style={[styles.gamePage.boardSquare]} underlayColor="#FAEB00" onPress={() => this.setState({ opened: true })}>
        <Text style={styles.gamePage.squareLetter}>{displayCharacter}</Text>
      </TouchableHighlight>
    )
  }
});

export default Square;