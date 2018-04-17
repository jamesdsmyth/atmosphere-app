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
      // climateList: new Animated.Value(1),
      // compareColorList: new Animated.Value(0),
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

    this.openColor = this.openColor.bind(this);
    this.closeColor = this.closeColor.bind(this);
    this.createCompareColorListColors = this.createCompareColorListColors.bind(this);
  }
  
  openColor() {
    this.setState({
      climateList: false,
      compareColorList: true
    });

    console.log('open color clicked');

    // Animated.parallel([
    //   Animated.timing(
    //     this.state.climateList,
    //     {
    //       toValue: 0,
    //       easing: Easing.ease,
    //       duration: 200
    //     }
    //   ).start(),
  
    //   Animated.timing(
    //     this.state.compareColorList,
    //     {
    //       toValue: 1,
    //       easing: Easing.ease,
    //       duration: 200
    //     }
    //   ).start()
    // ])
  }

  closeColor() {
    this.setState({
      climateList: true,
      compareColorList: false
    });
  }

  onClickColor(color) {
    console.log(color);
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
  
  render() {

    return (
      <View>
        <ClimateList
          weather={this.props.weather.list}
          openColor={this.openColor}
          closeColor={this.closeColor}
          isVisible={this.state.climateList}
        />
        <CompareColorList
          closeColor={this.closeColor}
          isVisible={this.state.compareColorList}
          onClickColor={this.createCompareColorListColors}
          colors={[1, 2, 3]}
        />
      </View>
    )
  }
}