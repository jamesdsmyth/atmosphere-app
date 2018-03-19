import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const WeatherSvg = (props) => {

  const weatherTypeLower = props.weatherType.toLowerCase();
  const path = '../assets/';
  let uri = '';

  console.log(weatherTypeLower)

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
    />
    </View>
  )
}

export default WeatherSvg;