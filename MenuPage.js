import React from 'react';
import styles from './styles';
import HighScoresPage from './HighScoresPage';
import GamePage from './GamePage';
import { puns } from './puns';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  View,
  Alert,
  Modal,
  AsyncStorage,
} from 'react-native';

let SetingsModal = React.createClass({
  getInitialState() {
    return ({
      modalVisible: false
    });
  },

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },

  render() {
    return (
      <View>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <View style={{marginTop: 22}}>
        <View>
          <Text>Hello World!</Text>

          <TouchableHighlight onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>

        </View>
       </View>
      </Modal>
      <TouchableHighlight onPress={() => {
        this.setModalVisible(true)
      }}>
        <Text>Show Modal</Text>
      </TouchableHighlight>
      </View>
    )
  }
})

let MenuPage = React.createClass({
  componentDidMount() {
    this._loadInitialState().done();
    this.props.events.addListener('rightButtonPressed', this.alertMe);
  },

  alertMe() {
    Alert.alert(JSON.stringify(this.state.gameswon));
  },

  getInitialState() {
    return {
      gameswon: [],
    };
  },

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem('gameswon');
      if (value !== null){
        this.setState({ gameswon: JSON.parse(value) });
      } else {
        this.setState({ gameswon: [] });
      }
    } catch (error) {
      Alert.alert('ERROR', error.message);
    }
  },

  pushGamePage(title, gameType) {
    this.props.navigator.push({
      title: title,
      component: GamePage,
      passProps: { 
        gameType: gameType,
        gameswon: this.state.gameswon,
        reloadInitialState: () => this.reloadInitialState(),
      },
    });
  },

  reloadInitialState() {
     this._loadInitialState().done();
  },

  pushHighScoresPage() {
    this.props.navigator.push({
      title: 'High Scores',
      component: HighScoresPage,
      rightButtonTitle: 'Search',
      onRightButtonPress: () => Alert.alert('Hello','This is an alert'),
      passProps: {
        gameswon: this.state.gameswon,
        reloadInitialState: () => this.reloadInitialState(),
      },
    });
  },

  render() {
    const easyPunsDisabled = puns['easy'].filter(pun => this.state.gameswon.indexOf(pun.question) >= 0).length === puns['easy'].length;
    const easyPunsCompleted = puns['easy'].filter(pun => this.state.gameswon.indexOf(pun.question) >= 0).length + '/' + puns['easy'].length;
    const mediumPunsDisabled = puns['medium'].filter(pun => this.state.gameswon.indexOf(pun.question) >= 0).length === puns['medium'].length;
    const mediumPunsCompleted = puns['medium'].filter(pun => this.state.gameswon.indexOf(pun.question) >= 0).length + '/' + puns['medium'].length;
    const hardPunsDisabled = puns['hard'].filter(pun => this.state.gameswon.indexOf(pun.question) >= 0).length === puns['hard'].length;
    const hardPunsCompleted = puns['hard'].filter(pun => this.state.gameswon.indexOf(pun.question) >= 0).length + '/' + puns['hard'].length;
    
    return (
      <View style={styles.menuPage.mainContainer}>
        <View></View>
        <View></View>
        <SetingsModal />
        <TouchableHighlight style={[styles.menuPage.menuButton, easyPunsDisabled && styles.menuPage.disabledButton]} onPress={() => this.pushGamePage('Easy Game', 'easy')} disabled={easyPunsDisabled}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>Easy Mode</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {easyPunsCompleted} Completed </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.menuPage.menuButton, mediumPunsDisabled && styles.menuPage.disabledButton]} onPress={() => this.pushGamePage('Medium Game', 'medium')} disabled={mediumPunsDisabled}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>Medium</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {mediumPunsCompleted} Completed </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.menuPage.menuButton, hardPunsDisabled && styles.menuPage.disabledButton]} onPress={() => this.pushGamePage('Hard Game', 'hard')} disabled={hardPunsDisabled}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>Hard Mode</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {hardPunsCompleted} Completed </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.menuPage.menuButton, (this.state.gameswon.length === 0) && styles.menuPage.disabledButton]} onPress={() => this.pushHighScoresPage()} disabled={(this.state.gameswon.length === 0)}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>View Archive</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {this.state.gameswon.length} pun{(this.state.gameswon.length !== 1) && 's'} to view </Text>
          </View>
        </TouchableHighlight>
        <View></View>
      </View>
    );
  }
});

export default MenuPage;