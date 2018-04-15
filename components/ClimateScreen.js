import React, { Component } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import ClimateList from './ClimateList';
import CompareColorList from './CompareColorList';

const window = Dimensions.get('window');

//
// ClimateScreen contains 2 sections (ClimateList, CompareColorList)
// Only one is shown at a time depending on the actions of the user.
// openColor, closeColor are both functions and passed to ClimateList
// Clicking either of these functions will animate both sections to show
// either one or the other.
//

export default class ClimateScreen extends Component {

  constructor() {
    super();

    this.state = {
      showClimateList: true,
      climateListHeight: new Animated.Value(0),
      compareColorListHeight: new Animated.Value(window.height * -1)
    }

    this.openColor = this.openColor.bind(this);
    this.closeColor = this.closeColor.bind(this);
  }
  
  openColor() {
    this.setState({
      showClimateList: false
    });

    Animated.timing(
      this.state.climateListHeight,
      {
        toValue: window.height,
        duration: 1000
      }
    ).start();

    Animated.timing(
      this.state.compareColorListHeight,
      {
        toValue: 0,
        duration: 1000
      }
    ).start();
  }

  closeColor() {
    this.setState({
      showClimateList: true
    });
  }
  
  render() {

    return (
      <View>
        <CompareColorList
          closeColor={this.closeColor}
          isVisible={this.state.compareColorListHeight}
        />
        <ClimateList
          weather={this.props.weather.list}
          openColor={this.openColor}
          closeColor={this.closeColor}
          isVisible={this.state.climateListHeight}
        />
      </View>
    )
  }
}