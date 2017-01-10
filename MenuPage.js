import React from 'react';
import styles from './styles';
import HighScoresPage from './HighScoresPage';
import GamePage from './GamePage';
import SettingsModal from './components/SettingsModal';
import EventEmitter from 'wolfy87-eventemitter';
import { puns } from './puns';
import {
  TouchableHighlight,
  Text,
  View,
  Alert,
  Modal,
  AsyncStorage,
} from 'react-native';

let rightButtonHandler = new EventEmitter();

let MenuPage = React.createClass({
  componentDidMount() {
    this._loadInitialState().done();
    // this.props.events.addListener('rightButtonPressed', this.toggleSettingsModal);
  },

  handleRightButtonPress() {
    rightButtonHandler.emitEvent('rightButtonPressed');
  },

  toggleSettingsModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });;
  },

  getInitialState() {
    return {
      gamesWon: [],
      modalVisible: false,
    };
  },

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem('gamesWon');
      if (value !== null){
        this.setState({ gamesWon: JSON.parse(value) });
      } else {
        this.setState({ gamesWon: [] });
      }
    } catch (error) {
      Alert.alert('ERROR', error.message);
    }
  },

  pushGamePage(title, gameType, question = null, method = (route) => this.props.navigator.push(route)) {
    method({
      title: title,
      component: GamePage,
      rightButtonTitle: 'Reset',
      onRightButtonPress: () => this.handleRightButtonPress(),
      passProps: { 
        events: rightButtonHandler,
        question: question,
        gameType: gameType,
        gamesWon: this.state.gamesWon,
        reloadInitialState: () => this.reloadInitialState(),
        onRightButtonPress: () => this.handleRightButtonPress(),
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
      rightButtonTitle: 'Clear Scores',
      onRightButtonPress: () => this.handleRightButtonPress(),
      passProps: {
        gamesWon: this.state.gamesWon,
        events: rightButtonHandler,
        reloadInitialState: () => this.reloadInitialState(),
        pushGamePage: this.pushGamePage,
        onRightButtonPress: () => this.handleRightButtonPress(),
      },
    });
  },

  render() {
    const easyPunsCompleted = this.state.gamesWon.filter(gameWon => gameWon.gameType === 'easy').length;
    const easyPunsDisabled = easyPunsCompleted === puns['easy'].length;
    const mediumPunsCompleted = this.state.gamesWon.filter(gameWon => gameWon.gameType === 'medium').length;
    const mediumPunsDisabled = mediumPunsCompleted === puns['medium'].length;
    const hardPunsCompleted = this.state.gamesWon.filter(gameWon => gameWon.gameType === 'hard').length;
    const hardPunsDisabled = hardPunsCompleted === puns['hard'].length;
    
    return (
      <View style={styles.menuPage.mainContainer}>
        <View></View>
        <View></View>
        <SettingsModal isVisible={this.state.modalVisible} hideModal={() => this.toggleSettingsModal()} />
        <TouchableHighlight style={[styles.menuPage.menuButton, easyPunsDisabled && styles.menuPage.disabledButton]} onPress={() => this.pushGamePage('Easy Game', 'easy')} disabled={easyPunsDisabled}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>Easy Mode</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {easyPunsCompleted}/{puns['easy'].length} Completed </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.menuPage.menuButton, mediumPunsDisabled && styles.menuPage.disabledButton]} onPress={() => this.pushGamePage('Medium Game', 'medium')} disabled={mediumPunsDisabled}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>Medium</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {mediumPunsCompleted}/{puns['medium'].length} Completed </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.menuPage.menuButton, hardPunsDisabled && styles.menuPage.disabledButton]} onPress={() => this.pushGamePage('Hard Game', 'hard')} disabled={hardPunsDisabled}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>Hard Mode</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {hardPunsCompleted}/{puns['hard'].length} Completed </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.menuPage.menuButton, (this.state.gamesWon.length === 0) && styles.menuPage.disabledButton]} onPress={() => this.pushHighScoresPage()} disabled={(this.state.gamesWon.length === 0)}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>View Archive</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {this.state.gamesWon.length} Pun{(this.state.gamesWon.length !== 1) && 's'} To View </Text>
          </View>
        </TouchableHighlight>
        <View></View>
      </View>
    );
  }
});

export default MenuPage;