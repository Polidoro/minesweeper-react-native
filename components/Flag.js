import React from 'react';
import styles from '../styles';
import flagImage from '../images/flag.png';
import {
  PanResponder,
  Animated,
  Image,
  View,
} from 'react-native';

const Flag = React.createClass({
  getInitialState() {
    return({
      pan: new Animated.ValueXY(),
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !(nextProps.seconds === this.props.seconds);
  },

  render() {
    let animatedEvent = Animated.event([null, {dx : this.state.pan.x, dy : this.state.pan.y}]);

    let panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.props.gameState === 'active',
      onPanResponderMove: (e, gesture) => {
        let { boardWidth, boardHeight, boardStartX, boardStartY } = this.props.boardMeasurements;
        let xWithRespectToBoard = (gesture.moveX - boardStartX);
        let yWithRespectToBoard = (gesture.moveY - boardStartY);

        if(xWithRespectToBoard > 0 && xWithRespectToBoard < boardWidth && yWithRespectToBoard > 0 && yWithRespectToBoard < boardHeight) {
          this.props.highlightCell(
            Math.floor(yWithRespectToBoard / (boardHeight / this.props.thePun.boardRows)), 
            Math.floor(xWithRespectToBoard / (boardWidth / this.props.thePun.boardCols))
          );
        } else {
          this.props.highlightCell(null, null);
        }

        return animatedEvent(e, gesture);
      },

      onPanResponderRelease: (e, gesture) => {
        let { boardWidth, boardHeight, boardStartX, boardStartY } = this.props.boardMeasurements;
        let xWithRespectToBoard = (gesture.moveX - boardStartX);
        let yWithRespectToBoard = (gesture.moveY - boardStartY);

        if(xWithRespectToBoard > 0 && xWithRespectToBoard < boardWidth && yWithRespectToBoard > 0 && yWithRespectToBoard < boardHeight) {
          this.props.highlightCell(null, null);
          this.props.placeFlag(
            Math.floor(yWithRespectToBoard / (boardHeight / this.props.thePun.boardRows)), 
            Math.floor(xWithRespectToBoard / (boardWidth / this.props.thePun.boardCols))
          );
        }

        Animated.spring(this.state.pan, { toValue: {x: 0, y: 0} }).start()
      }
    });

    return (
      <View style={{width: 60, height: 60}}>
        <Animated.View {...panResponder.panHandlers} style={[this.state.pan.getLayout(), styles.gamePage.theFlag]}>
          <Image source={flagImage} />
        </Animated.View>
      </View>
    )
  }
});

export default Flag;