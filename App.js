import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Provider } from 'react-redux';

import styles from './assets/styles/styles';
import Wrapper from './components/Wrapper';

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
    return (
      <Provider store={store}>
        <Wrapper />
      </Provider>
    )
  }
}