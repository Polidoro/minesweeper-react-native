import React from 'react';
import styles from '../styles';
import Button from './Button';
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';

let InstructionsModal = React.createClass({
  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
        <View style={styles.instructionsModal.mainContainer}>
          <Text style={styles.instructionsModal.headerText}>How to play</Text>
          <Text style={styles.instructionsModal.contentText}>Just like the classic puzzle game, your job is to find and flag all the mines on the board without accidentally revealing one.</Text>
          <Text style={styles.instructionsModal.contentText}>Unlike the classic game, every puzzle comes with a riddle, and each time you place a flag on the board, one letter of the riddle's answer will be revealed.</Text>
          <Text style={styles.instructionsModal.contentText}>If you place a flag correctly, the letter will be accurate, but if you place a flag on a square that is not a mine, you will be shown an incorrect letter to confuse you!</Text>
          <Text style={styles.instructionsModal.contentText}>See if you can solve all the puns, and then see if you can beat the high scores for each riddle!</Text>
          <Button onPress={() => this.props.hideModal()} text='Got it!' />
        </View>
      </Modal>
    )
  }
})

export default InstructionsModal;
