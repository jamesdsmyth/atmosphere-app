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
      showClimateList: true
    }

    this.openColor = this.openColor.bind(this);
    this.closeColor = this.closeColor.bind(this);
  }
  
  openColor() {
    this.setState({
      showClimateList: false
    });
  }

  closeColor() {
    this.setState({
      showClimateList: true
    })
  }
  
  render() {

    return (
      <View>
        <CompareColorList
          closeColor={this.closeColor}
          isVisible={false}
        />
        <ClimateList
          weather={this.props.weather.list}
          openColor={this.openColor}
          closeColor={this.closeColor}
          isVisible={this.state.showClimateList}
        />
      </View>
    )
  }
}