import React from 'react';
import styles from '../styles';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const Timer = React.createClass({
  getInitialState() {
    return({
      seconds: 0,
      timer: setInterval(this.handleTimeUpdate, 1000)
    });
  },

  handleTimeUpdate() {
    this.setState({
      seconds: this.state.seconds+1
    })
  },

  render() {
    return <Text>{this.state.seconds}</Text>
  }
});

export default Timer;