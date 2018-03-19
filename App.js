import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import styles from './assets/styles/styles';
import SvgUri from 'react-native-svg-uri';
import WeatherSvg from './components/WeatherSvg';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      weather: null,
      loaded: false
    }
  }

  apiCall = () => {

    // using fetch() to get the weather data
    navigator.geolocation.getCurrentPosition(position => {

      let ceilingLat = Math.floor(position.coords.latitude);
      let ceilingLng = Math.floor(position.coords.longitude);
      let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${ceilingLat}&lon=${ceilingLng},&mode=json&appid=fb161b8bdfd1a946ed269b0b2cf42b77`;
  
  
      // using async to wrap the await methods.
      // we call apiRequest async function, within this we use the fetch api
      // we await until it returns a promise, we then await until the json has
      // been parsed. Then once that is done we dispatch an action.
      const apiRequest = async () => {

        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(url);

          this.setState({
            weather: json,
            loaded: true
          });
        
        } catch(error) {}
      }
  
      apiRequest();
    });
  }

  render() {

    if(!this.state.loaded) {
      this.apiCall();
    }

    const city = this.state.weather !== null ? this.state.weather.city.name : 'City';
    const weather = this.state.weather !== null ? this.state.weather.list: [];

    return (
      <View style={styles.container}>
        {
          weather.map((x, i) => {
            while(i < 6) {
              const temperature = Math.round(x.main.temp - 273.15);
              const sectionClass = i === 0 ? styles.sectionNow : styles.sectionLater;
              const sectionTemperature = styles[`section${temperature}`];
              const timeArray = x.dt_txt.split('');
              const strippedTime = timeArray.slice(timeArray.length - 8, timeArray.length - 3);

              return  <View style={[styles.section, sectionClass, sectionTemperature]} key={i}>
                        {
                          i === 0 ?
                          <View style={[styles.sectionInner]} key={i}>
                            <Text style={styles.sectionText} key={i}>
                              {temperature}&#176; with {x.weather[0].main.toLowerCase()} right now
                            </Text>
                            <WeatherSvg weatherType={x.weather[0].main} />
                          </View>:
                          <View style={[styles.sectionInner]} key={i}>
                            <Text style={styles.sectionText} key={i}>
                              {temperature}&#176; at {strippedTime}
                            </Text>
                            <WeatherSvg weatherType={x.weather[0].main} />
                          </View>
                        }
              </View>;
            }
          })
        }
      </View>
    );
  }
}