import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import WeatherSvg from './WeatherSvg';
import styles from '../assets/styles/styles';
import PropTypes from 'prop-types';

class CompareColorScreen extends Component {
  render() {

    const { navigation } = this.props;
    const temperature = navigation.getParam('temperature');
    const weatherType = navigation.getParam('weatherType');
    const sectionTemperature = styles[`section${temperature}`];

    return (
      <View style={[styles.section, sectionTemperature]}>
        {/* { */}
          {/* colors.map((color, i) => { */}
          <View style={styles.sectionInner}>
            <Text style={styles.sectionText}>
              {temperature}&#176;c and {weatherType.toLowerCase()} right now
            </Text>
            <WeatherSvg weatherType={weatherType} />
          </View>
          {/* <TouchableHighlight 
            //   style={[styles.section, styles.sectionThird, { 'backgroundColor': `rgb(${color.r}, ${color.g}, ${color.b})`}]}
            //   onPress={() => onClickColor()}
            //   key={i}
            // >
            //   <Text>{color.r} {color.g} {color.b}</Text>
            // </TouchableHighlight> */}
          {/* // })
        // } */}
      </View>
    )
  }
}

CompareColorScreen.propTypes = {
  closeColor: PropTypes.func,
  isVisible: PropTypes.bool,
  onClickColor: PropTypes.func,
  colors: PropTypes.array
}

export default CompareColorScreen;