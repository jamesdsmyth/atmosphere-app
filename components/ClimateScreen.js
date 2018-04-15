import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';
import WeatherSvg from './WeatherSvg';
import styles from '../assets/styles/styles';

import ClimateList from './ClimateList';
import CompareColorList from './CompareColorList';

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

  closeColor() {
    this.setState({
      fullScreen: false
    })
  }
  
  render() {
    console.log(this.props.weather.list)
    return (
      <View>
        <CompareColorList />
        <ClimateList weather={this.props.weather.list} />
      </View>
    )
  }
}