import React, { Component } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';
import WeatherSvg from './WeatherSvg';
import styles from '../assets/styles/styles';

class WeatherList extends Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
      refreshing: false
    }
  }

  // pulling the screen down will refresh the app
  // setting loaded to false will re-render the view and call the weather API again
  refreshView() {
    this.setState({
      loaded: false
    });
  }

  componentDidMount() {
    this.props.onRequestWeather();
  }

  render() {

    const appState = this.props.appState;

    console.log('WEATHER ARRAY IS', appState);

    const weatherArray = appState.weather != false && appState.weather;
    const fetchingAPI = appState.fetching;
    const APIError = appState.error;

    console.log(weatherArray, fetchingAPI, APIError);

    if(fetchingAPI) {
      return (
        <Text style={styles.loadingText}>Fetching your climate...</Text>
      )
    } else if (APIError) {
      return (
        <Text style={styles.warningText}>Failed to load climate!</Text>
      )
    } else if (weatherArray){
      return (
        // if API_CALL_SUCCESS
        
        weatherArray.list.map((x, i) => {

          while(i < 6) {
            const temperature = Math.round(x.main.temp - 273.15);
            const sectionClass = i === 0 ? styles.sectionNow : styles.sectionLater;
            const updatedTemperature = temperature < 0 ? temperature + 100 : temperature;
            const sectionTemperature = styles[`section${updatedTemperature}`];
            const timeArray = x.dt_txt.split('');
            const strippedTime = timeArray.slice(timeArray.length - 8, timeArray.length - 3);

            return  <View 
                      style={[styles.section, sectionClass, sectionTemperature]} 
                      key={i}
                    >
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
      )
    } else {
      return (
        <Text>Loading</Text>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestWeather: () => dispatch({ type: "API_CALL_REQUEST" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);