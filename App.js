import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import styles from './assets/styles/styles';
import Wrapper from './components/Wrapper';

import store from './reducers/allReducers';

// export default class App extends Component {

//   constructor() {
//     super();
//     this.state = {
//       loaded: false,
//       loadingFailed: false,
//       refreshing: false
//     }
//   }

//   render() {
//     return (
      // <Provider store={store}>
      //   <Wrapper />
      // </Provider>
//     )
//   }
// }

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    Details: DetailsScreen
  },
  initialRouteName: 'Home'
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}