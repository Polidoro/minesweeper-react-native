import React from 'react';
import styles from '../styles';
import colors from '../styles/colors';
import mineImage from '../images/mine.png';
import flagImage from '../images/flag.png';
import {
  TouchableWithoutFeedback ,
  View,
  Text,
  Image,
} from 'react-native';

const Square = React.createClass({
  shouldComponentUpdate(nextProps) {
    return !(this.props.squareData.isOpened === nextProps.isOpened && this.props.squareData.isFlagged === nextProps.isFlagged)
  },

  render() {
    const squareData = this.props.squareData;
    let displayCharacter = ' ';
    let squareColor = colors.cellColor;
    let squareOpacity = this.props.highlighted ? 0.8 : 1.0;
    let squareContent = <View />

    if (squareData.isOpened && squareData.isMine) {
        squareColor = colors.buttonColor
        squareContent = <Image source={mineImage} style={styles.gamePage.cellImage} />
    } else if (squareData.isFlagged) {
        squareContent = <Image source={flagImage} style={styles.gamePage.cellImage} />
    } else if (squareData.isOpened) {
        squareColor = colors.backgroundColor;
        squareOpacity = 1-(squareData.adjacentMines/8);
        squareContent = <Text style={styles.gamePage.squareLetter}>{squareData.adjacentMines || ' '}</Text>
    }

    return (
      <TouchableWithoutFeedback
        delayLongPress={400}
        onLongPress={this.props.onLongPress}
        onPress={this.props.onShortPress}
        onPressIn={this.props.onPressIn}
        onPressOut={this.props.onPressOut}
        disabled={this.props.disabled}
      >
        <View style={[styles.gamePage.boardSquare, { backgroundColor: squareColor, opacity: squareOpacity }]}>
          {squareContent}
        </View>
      </TouchableWithoutFeedback>
    )
  }
});

export default Square;