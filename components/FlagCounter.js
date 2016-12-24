import React from 'react';
import styles from '../styles';
import {
  Text,
  View,
} from 'react-native';

const FlagCounter = React.createClass({
  render() {
    return <Text>{this.props.flagsPlaced}/{this.props.mineCount} Flags Placed</Text>
  }
});

export default FlagCounter;