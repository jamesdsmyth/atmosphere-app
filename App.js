import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import Wrapper from './components/Wrapper';
import ColorScreen from './components/ColorScreen';

import store from './reducers/allReducers';

const RootStack = createStackNavigator(
  {
    Home: Wrapper,
    Color: ColorScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}