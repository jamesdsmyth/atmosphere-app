import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import Wrapper from './components/Wrapper';
import CompareColorScreen from './components/CompareColorScreen';

import store from './reducers/allReducers';

class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const temp = navigation.getParam('temperature');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen and the temperature is {temp}</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: Wrapper,
    Details: CompareColorScreen,
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