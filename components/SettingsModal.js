import React from 'react';
import styles from '../styles';
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';

let SettingsModal = React.createClass({
  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.isVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <View style={{marginTop: 22}}>
        <View>
          <Text>Hello World!</Text>
          <TouchableHighlight onPress={() => this.props.hideModal()}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
       </View>
      </Modal>
    )
  }
})

export default SettingsModal;