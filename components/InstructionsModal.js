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
          <Text style={styles.instructionsModal.headerText}>PunSweeper</Text>
          <Text style={styles.instructionsModal.contentText}>It's MineSweeper with puns!</Text>
          <Text style={styles.instructionsModal.contentText}>Every stage comes with a riddle!</Text>
          <Text style={styles.instructionsModal.contentText}>Each flag you place reveals a letter of the punchline!</Text>
          <Text style={styles.instructionsModal.contentText}>Flag all the mines to win!</Text>
          <Button onPress={() => this.props.hideModal()} text='Got it!' />
        </View>
      </Modal>
    )
  }
})

export default InstructionsModal;
