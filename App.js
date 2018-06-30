import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import Wrapper from './components/Wrapper';
import ColorScreen from './components/ColorScreen';
import ColorPicker from './components/ColorPicker';

import store from './reducers/allReducers';

const RootStack = createStackNavigator(
  {
    Home: Wrapper,
    Color: ColorScreen,
    ColorPicker: ColorPicker
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