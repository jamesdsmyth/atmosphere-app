import React from 'react';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import styles from '../assets/styles/styles';

const WeatherSvg = (props) => {

  const weatherTypeLower = props.weatherType.toLowerCase();
  const path = '../assets/';
  let uri = '';

  switch(weatherTypeLower) {
    case 'rain':
      uri = require(`../assets/rain.svg`);
      break;

    case 'clouds':
      uri = require(`../assets/cloud.svg`);
      break;

    case 'sun':
      uri = require(`../assets/sun.svg`);
      break;

    case 'clear':
      uri = require(`../assets/sun.svg`);
      break;

    default:
      uri = require(`../assets/sun.svg`);
      break;
  }

  return (
    <View>
    <SvgUri
      width="50"
      height="50"
      source={uri}
      fill="#ffffff"
    />
    </View>
  )
}

export default WeatherSvg;