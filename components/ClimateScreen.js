import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';
import WeatherSvg from './WeatherSvg';
import styles from '../assets/styles/styles';

export default class ClimateScreen extends Component {

  constructor() {
    super();

    this.state = {
      fullScreen: false
    }
  }
  
  expandColor() {
    this.setState({
      fullScreen: true
    });
  }
  
  render() {
    return (
      this.props.weather.list.map((x, i) => {

        while(i < 6) {
          const temperature = Math.round(x.main.temp - 273.15);
          
          const updatedTemperature = temperature < 0 ? temperature + 100 : temperature;
          const sectionTemperature = styles[`section${updatedTemperature}`];
          const timeArray = x.dt_txt.split('');
          const strippedTime = timeArray.slice(timeArray.length - 8, timeArray.length - 3);

          // deciding on the section classes
          let sectionClass;

          if(this.state.fullScreen) {
            sectionClass = i === 0 ? styles.sectionFull : styles.sectionHide;
          } else {
            sectionClass = i === 0 ? styles.sectionNow : styles.sectionLater;
          }

          return  <View 
                    style={[styles.section, sectionClass, sectionTemperature]} 
                    key={i}
                  >
                    {
                      i === 0 ?
                      <View>
                        <View style={[styles.sectionInner]} key={i}>
                          <Text style={styles.sectionText} key={i}>
                            {temperature}&#176;c and {x.weather[0].main.toLowerCase()} right now
                          </Text>
                          <WeatherSvg weatherType={x.weather[0].main} />
                        </View>
                        <Text>Does this color feel right to you?</Text>
                        <TouchableHighlight
                          onPress={() => this.expandColor()}>
                          <Text>Yes</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                          onPress={() => alert('color is bad')}>
                          <Text>No</Text>
                        </TouchableHighlight>
                      </View>
                      :
                      <View style={styles.sectionInner} key={i}>
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
  }
} 

// = ( {weather} ) => (
//   // API_CALL_SUCCESS

// )
