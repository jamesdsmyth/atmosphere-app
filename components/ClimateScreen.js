import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight } from 'react-native';
import WeatherSvg from './WeatherSvg';
import styles from '../assets/styles/styles';

class ClimateScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      climateList: true,
      compareColorList: false,
      currentColor: {
        r: 201,
        g: 218,
        b: 85
      },
      lighterColor: {
        r: 201,
        g: 218,
        b: 85
      },
      darkerColor: {
        r: 201,
        g: 218,
        b: 85
      }
    }

    this.createCompareColorListColors = this.createCompareColorListColors.bind(this);
    this.showMoreColors = this.showMoreColors.bind(this);
  }

  createCompareColorListColors() {
    let color = this.state.currentColor;

    let lighter = Object.assign({}, color);
    lighter.r = lighter.r - 30;

    let darker = Object.assign({}, color);
    darker.r = darker.r + 30;

    this.setState({
      lighterColor: lighter,
      darkerColor: darker
    });
  }

  // when a user clicks on 'no' they will be taken to a new screen 
  // displaying more colors. Here we are dispatching the API_CALL_REQUEST_COLORS
  // and navigating to the MultipleColorScreen screen
  showMoreColors() {
    this.props.showMoreColorsDispatch(); 
    this.props.navigation.navigate('MultipleColorScreen')
  }
  
  render() {

    const { weather } = this.props.weather;

    return (
      <View>
      {
        weather.list.map((x, i) => {

          while(i < 6) {
            const temperature = Math.round(x.main.temp - 273.15);
            
            const updatedTemperature = temperature < 0 ? temperature + 100 : temperature;
            const sectionTemperature = styles[`section${updatedTemperature}`];
            const timeArray = x.dt_txt.split('');
            const strippedTime = timeArray.slice(timeArray.length - 8, timeArray.length - 3);
            const weatherType = x.weather[0].main;
      
            // deciding on the section classes
            let sectionClass = i === 0 ? styles.sectionNow : styles.sectionLater;

            return <View
                      style={[styles.section, sectionClass, sectionTemperature]}
                      key={i}
                    >
                      {
                        i === 0 ?
                        <TouchableHighlight
                          style={[sectionClass, sectionTemperature]}
                          onPress={() => this.props.navigation.navigate('Color', { 
                            temperature: updatedTemperature,
                            weatherType: weatherType,
                            onClick: this.showMoreColors
                          })}
                        >
                          <View style={styles.sectionInner} key={i}>
                            <Text style={styles.sectionText} key={i}>
                              {temperature}&#176;c and {weatherType.toLowerCase()} right now
                            </Text>
                            <WeatherSvg weatherType={weatherType} />
                          </View>
                        </TouchableHighlight>
                        :
                        <View style={styles.sectionInner} key={i}>
                          <Text style={styles.sectionText} key={i}>
                            {temperature}&#176;c at {strippedTime}
                          </Text>
                          <WeatherSvg weatherType={weatherType} />
                        </View>
                      }
                    </View>;
          }
        })
      }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showMoreColorsDispatch: () => dispatch({ type: 'API_CALL_REQUEST_COLORS' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClimateScreen);