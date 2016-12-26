import React from 'react';
import styles from '../styles';
import {
  Text,
  PanResponder,
  Animated,
} from 'react-native';

const Flag = React.createClass({
  getInitialState() {
    return({
      pan: new Animated.ValueXY(),
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !(nextProps.seconds === this.props.seconds );
  },

  render() {
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.props.gameState === 'active',
      onPanResponderMove: Animated.event([null,{
        dx : this.state.pan.x,
        dy : this.state.pan.y
      }]),

      onPanResponderRelease: (e, gesture) => {
        let { boardWidth, boardHeight, boardStartX, boardStartY } = this.props.boardMeasurements;

        let xWithRespectToBoard = (gesture.moveX - boardStartX);
        let yWithRespectToBoard = (gesture.moveY - boardStartY);

        if(xWithRespectToBoard > 0 && xWithRespectToBoard < boardWidth && yWithRespectToBoard > 0 && yWithRespectToBoard < boardHeight) {
          this.props.placeFlag(
            Math.floor(yWithRespectToBoard / (boardHeight / this.props.thePun.boardRows)), 
            Math.floor(xWithRespectToBoard / (boardWidth / this.props.thePun.boardCols))
          );
        }

        Animated.spring( this.state.pan, { toValue: {x: 0, y: 0} } ).start()
      }
    });

    return (
      <Animated.View {...panResponder.panHandlers} style={[this.state.pan.getLayout(), styles.gamePage.theFlag]} />
    )
  }
});

export default Flag;