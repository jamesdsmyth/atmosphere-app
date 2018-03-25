import React from 'react';
import { Text, View, ScrollView, RefreshControl, Dimensions } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import WeatherSvg from './components/WeatherSvg';
import styles from './assets/styles/styles';

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
      console.log(new Date());
  
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
        <ScrollView 
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshView.bind(this)}
            />
          }
        contentContainerStyle={styles.container}>      
          {
            weather.length === 0 && <Text style={styles.loadingText}>Loading your climate...</Text>
          }
          
          {
            weather.map((x, i) => {
              while(i < 6) {
                const temperature = Math.round(x.main.temp - 273.15);
                const sectionClass = i === 0 ? styles.sectionNow : styles.sectionLater;
                const updatedTemperature = temperature < 0 ? temperature + 100 : temperature;
                const sectionTemperature = styles[`section${updatedTemperature}`];
                const timeArray = x.dt_txt.split('');
                const strippedTime = timeArray.slice(timeArray.length - 8, timeArray.length - 3);
  
                return  <View style={[styles.section, sectionClass, sectionTemperature]} key={i}>
                          {
                            i === 0 ?
                            <View style={[styles.sectionInner]} key={i}>
                              <Text style={styles.sectionText} key={i}>
                                {temperature}&#176;c and {x.weather[0].main.toLowerCase()} right now
                              </Text>
                              <WeatherSvg weatherType={x.weather[0].main} />
                            </View>:
                            <View style={[styles.sectionInner]} key={i}>
                              <Text style={styles.sectionText} key={i}>
                                {temperature}&#176;c at {strippedTime}
                              </Text>
                              <WeatherSvg weatherType={x.weather[0].main} />
                            </View>
                          }
                        </View>;
              }
            })
          }
        </ScrollView>
      )
    }
  }
}