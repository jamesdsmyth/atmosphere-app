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
      weather: null,
      loaded: false,
      loadingFailed: false,
      refreshing: false
    }
  }

  apiCall = () => {

    // using fetch() to get the weather data
    navigator.geolocation.getCurrentPosition(position => {

      const ceilingLat = Math.floor(position.coords.latitude);
      const ceilingLng = Math.floor(position.coords.longitude);
      const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${ceilingLat}&lon=${ceilingLng},&mode=json&appid=fb161b8bdfd1a946ed269b0b2cf42b77`;
      console.log('new date is', new Date());
  
      // using async to wrap the await methods.
      // we call apiRequest async function, within this we use the fetch api
      // we await until it returns a promise, we then await until the json has
      // been parsed. Then once that is done we dispatch an action.
      const apiRequest = async () => {

        try {
          const response = await fetch(url);
          const json = await response.json();
          
          this.setState({
            weather: json,
            loaded: true
          });
        
        } catch(error) {
          this.setState({
            loadingFailed: true
          });
        }
      }
  
      apiRequest();
    });
  }

  // pulling the screen down will refresh the app
  // setting loaded to false will rerender the view and call the weather API again
  refreshView() {
    this.setState({
      loaded: false
    });
  }

  render() {

    console.log('rendering!!!!');

    if(!this.state.loaded) {
      this.apiCall();
    }

    const city = this.state.weather !== null ? this.state.weather.city.name : 'City';
    const weather = this.state.weather !== null ? this.state.weather.list: [];

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
          {/* <WeatherList 
            weather={weather}
            onRefresh={() => this.refreshView()}
          /> */}
          <WeatherList />
        </Provider>
      )
    }
  }
}