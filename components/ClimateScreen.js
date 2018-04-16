import React, { Component } from 'react';
import { View, Animated, Easing, Dimensions } from 'react-native';
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
      climateList: new Animated.Value(1),
      compareColorList: new Animated.Value(0)
    }

    this.openColor = this.openColor.bind(this);
    this.closeColor = this.closeColor.bind(this);
  }
  
  openColor() {
    this.setState({
      showClimateList: false
    });

    Animated.parallel([
      Animated.timing(
        this.state.climateList,
        {
          toValue: 0,
          duration: 1000
        }
      ).start(),
  
      Animated.timing(
        this.state.compareColorList,
        {
          toValue: 1,
          easing: Easing.ease,
          duration: 1000
        }
      ).start()
    ])
  }

  closeColor() {
    this.setState({
      showClimateList: true
    });
  }

  onClickColor(word) {
    alert(word);
  }
  
  render() {

    return (
      <View>
        {/* <ClimateList
          weather={this.props.weather.list}
          openColor={this.openColor}
          closeColor={this.closeColor}
          isVisible={this.state.climateList}
        /> */}
        <CompareColorList
          closeColor={this.closeColor}
          isVisible={this.state.compareColorList}
          onClickColor={this.onClickColor}
        />
      </View>
    )
  }
}