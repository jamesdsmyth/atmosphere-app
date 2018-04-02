import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Provider } from 'react-redux';

import styles from './assets/styles/styles';
import WeatherList from './components/WeatherList';

import store from './reducers/allReducers';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
      loadingFailed: false,
      refreshing: false
    }
  }

  render() {

    if(this.state.loadingFailed) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.warningText}>Failed to load climate!</Text>
          <Text style={styles.warningText}>Please check your connection</Text>
        </ScrollView>
      )
    } else {
      return (
        <Provider store={store}>
          <WeatherList />
        </Provider>
      )
    }
  }
}