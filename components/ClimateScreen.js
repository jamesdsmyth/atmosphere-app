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

    this.openColor = this.openColor.bind(this);
    this.closeColor = this.closeColor.bind(this);
  }
  
  openColor() {
    alert('clicked open');
    this.setState({
      fullScreen: true
    });
  }

  closeColor() {
    alert('clicked close');
    this.setState({
      fullScreen: false
    })
  }
  
  render() {
    
    return (
      <View>
        <CompareColorList />
        <ClimateList
          weather={this.props.weather.list}
          openColor={this.openColor}
          closeColor={this.closeColor}
        />
      </View>
    )
  }
}