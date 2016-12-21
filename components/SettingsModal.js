import React from 'react';
import styles from '../styles';
import Button from './Button';
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  SegmentedControlIOS,
} from 'react-native';

let SettingsModal = React.createClass({
  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
        <View style={styles.settingsModal.mainContainer}>
          <Text>Hello World!</Text>
          <SegmentedControlIOS style={{width: 200}} direction='column' values={['One', 'Two', 'Three', 'Four', 'Five']} />
          <Button onPress={() => this.props.hideModal()} text='Hide Modal' />
        </View>
      </Modal>
    )
  }
})

export default SettingsModal;