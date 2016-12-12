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
      isBomb: this.props.isBomb,
      adjacentBombs: this.props.adjacentBombs,
    };
  },

  render() {
    const displayCharacter = this.state.opened ? this.state.adjacentBombs : '';
    return (
      <TouchableHighlight style={[styles.gamePage.boardSquare]} underlayColor="#FAEB00" onPress={() => this.setState({ opened: true })}>
        <Text style={styles.gamePage.squareLetter}>{displayCharacter}</Text>
      </TouchableHighlight>
    )
  }
});

export default Square;