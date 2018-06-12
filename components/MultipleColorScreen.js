import React, { Component } from 'react';
import { View, Text, TouchableHighlight, PanResponder } from 'react-native';
import styles from '../assets/styles/styles';

export default class MultipleColorsScreen extends Component {

  constructor() {
    super();

    // this._panResponder = {}
    this.clickColor = this.clickColor.bind(this);
  }

  clickColor(color) {
    console.log('the color being passed is', color);
  }

  // componentDidMount() {
  //   console.log('did mount');
  //   this._panResponder = PanResponder.create({
  //     // Ask to be the responder:
  //     onStartShouldSetPanResponder: (evt, gestureState) => true,
  //     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
  //     onMoveShouldSetPanResponder: (evt, gestureState) => true,
  //     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

  //     onPanResponderGrant: (evt, gestureState) => {
  //       alert(1)
  //       // The gesture has started. Show visual feedback so the user knows
  //       // what is happening!

  //       // gestureState.d{x,y} will be set to zero now
  //     },
  //     onPanResponderMove: (evt, gestureState) => {
  //       // The most recent move distance is gestureState.move{X,Y}
  //       alert(2)
  //       // The accumulated gesture distance since becoming responder is
  //       // gestureState.d{x,y}
  //     },
  //     onPanResponderTerminationRequest: (evt, gestureState) => true,
  //     onPanResponderRelease: (evt, gestureState) => {
  //       // The user has released all touches while this view is the
  //       // responder. This typically means a gesture has succeeded
  //       alert(3)
  //     },
  //     onPanResponderTerminate: (evt, gestureState) => {
  //       alert(4)
  //       // Another component has become the responder, so this gesture
  //       // should be cancelled
  //     },
  //     onShouldBlockNativeResponder: (evt, gestureState) => {
  //       alert(5)
  //       // Returns whether this component should block native components from becoming the JS
  //       // responder. Returns true by default. Is currently only supported on android.
  //       return true;
  //     },
  //   });

  //   console.log(this._panResponder);
  // }





  // STEPS FOR THIS TO WORK.
  // Dispatches the color, changes the store of that color and temperature
  // navigates back to home with the new color replacing the old one.
  
  render() {
    const { navigation } = this.props;

    console.log('inside multiple', navigation);
    return (
      <View style={styles.container}>
        <TouchableHighlight 
          style={[styles.sectionThird, styles.section, { 'backgroundColor': '#dddddd' }]}
          onPress={() => this.clickColor('#dddddd')}>
          <Text>
            Color 1
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={[styles.sectionThird, styles.section, { 'backgroundColor': '#cccccc' }]}>
          onPress={() => this.clickColor('#cccccc')}>
          <Text>
            Color 2
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={[styles.sectionThird, styles.section, { 'backgroundColor': '#eeeeee' }]}>
          onPress={() => this.clickColor('#eeeeee')}>
          <Text>
            Color 3
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}