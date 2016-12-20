import React from 'react';
import styles from '../styles';
import {
  Text,
  TouchableHighlight,
  View,
  Animated,
  Alert,
} from 'react-native';

const Square = React.createClass({
  getInitialState() {
    return {
        pressAction: new Animated.Value(0),
    };
  },

  componentWillMount() {
    this._value = 0;
    this.state.pressAction.addListener((v) => this._value = v.value);
  },

  handlePressIn() {
      Animated.timing(this.state.pressAction, {
        duration: 500,
        toValue: 1
      }).start(this.longHold);
  },

  handlePressOut() {
      Animated.timing(this.state.pressAction, {
        duration: this._value * 500,
        toValue: 0
      }).start();
  },

  longHold() {
    if (this._value >= 1) {
      this.props.onLongPress();
    } else {
      this.props.onShortPress();
    }
  },

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
      <TouchableHighlight 
        onPressIn={this.handlePressIn} 
        onPressOut={this.handlePressOut} 
        style={[styles.gamePage.boardSquare, { backgroundColor: squareColor }]}
      >
        <Text style={styles.gamePage.squareLetter}>{displayCharacter === 0 ? ' ' : displayCharacter}</Text>
      </TouchableHighlight>
    )
  }
});

export default Square;