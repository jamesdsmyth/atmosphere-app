import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const WeatherSvg = ({ weatherType }) => {

  const weatherType = weatherType.toLowerCase();
  const path = '../assets/';
  let uri;

  switch(weatherType) {
    case 'rain':
      uri = `${path}rain.svg`;
      break;

    case 'sun':
      uri = `${path}sun.svg`;
      break;

    case 'sun':
      uri = `${path}clouds.svg`;
      break;

    case 'clear':
      uri = `${path}sun.svg`;
      break;
  }

  return (
    <SvgUri
      width="60"
      height="60"
      source={require(uri)}
    /> 
  )
}

export default WeatherSvg;