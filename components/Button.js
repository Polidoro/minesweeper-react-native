import React from 'react';
import styles from '../styles';
import {
  Text,
  TouchableHighlight,
} from 'react-native';

const Button = React.createClass({
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <Text style={styles.global.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
});

export default Button;