import React, { Component } from 'react';
import { View, Animated, Text, Dimensions, PanResponder } from 'react-native';
import styles from '../assets/styles/styles';

export default class MultipleColorsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: {
        one: new Animated.ValueXY(),
        two: new Animated.ValueXY(),
        three: new Animated.ValueXY()
      },
      scale: new Animated.Value(1),
      selectedColor: this.props.navigation.getParam('selectedColor'),
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      circle0PosX: 0,
      circle0PosY: 0,
      circle1PosX: 0,
      circle1PosY: 0,
      circle2PosX: 0,
      circle2PosY: 0,
      currentPan: 0,
      pans: [this._panResponder, this._panResponder1, this._panResponder2]
    }

    this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
  }

  componentWillMount() {
    for(let i = 0; i < this.state.pans.length; i++) {

      const selector = this.state.pan[Object.keys(this.state.pan)[i]];

      this.state.pans[i] = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        // Initially, set the value of x and y to 0 (the center of the screen)
        onPanResponderGrant: (e, gestureState) => {
          selector.setOffset({x: selector.x._value, y: selector.y._value});
          selector.setValue({x: 0, y: 0});

          this.setState({
            currentPan: i
          });
        },

        onPanResponderMove: (e, gestureState) => {
          this.setState({
            [`circle${i}PosX`]: gestureState.moveX,
            [`circle${i}PosY`]: gestureState.moveY,
          });
  
          Animated.event([null, {
            dx: selector.x,
            dy: selector.y
          }])(e, gestureState);
  
          // now we can call the background color and change it.
          this.updateBackgroundColor();
        },

        onPanResponderRelease: (e, {vx, vy}) => {
          selector.flattenOffset();
        }
      });
    }
  }

  // getting the correct RGB values using the position of the square
  updateBackgroundColor() {
    const colors = 255;
    const h = this.state.height;
    const r = Math.round((colors / h) * this.state.circle0PosY);
    const g = Math.round((colors / h) * this.state.circle1PosY);
    const b = Math.round((colors / h) * this.state.circle2PosY);

    this.setState({
      selectedColor: [r, g, b]
    });
  }

  render() {
    const { pan, scale } = this.state;
    // const [translateX, translateY] = [pan[Object.keys(pan)[this.state.currentPan]].x, pan[Object.keys(pan)[this.state.currentPan]].y];
    const rotate = '0deg';
    let b = {
      imageStyle0: {},
      imageStyle1: {},
      imageStyle2: {}
    }

    for(let i = 0; i < this.state.pans.length; i++) {
      const [translateX, translateY] = [pan[Object.keys(pan)[i]].x, pan[Object.keys(pan)[i]].y];
      b[`imageStyle${i}`] = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};
    }

    console.log(b);

    return (
      <View style={styles.container}>
        <View
          style={
            [
              styles.section, 
              styles.sectionThird, 
              { 'backgroundColor': `rgb(${this.state.selectedColor[0]}, ${this.state.selectedColor[1]}, ${this.state.selectedColor[2]})`}
            ]}>
          <Animated.View style={[styles.colorPicker, b.imageStyle0]} {...this.state.pans[0].panHandlers}>
            <Text>
              0 - {this.state.selectedColor[0]} {this.state.selectedColor[1]} {this.state.selectedColor[2]}
            </Text>
          </Animated.View>

          <Animated.View style={[styles.colorPicker, b.imageStyle1]} {...this.state.pans[1].panHandlers}>
            <Text>
              1 - {this.state.selectedColor[0]} {this.state.selectedColor[1]} {this.state.selectedColor[2]}
            </Text>
          </Animated.View>

          <Animated.View style={[styles.colorPicker, b.imageStyle2]} {...this.state.pans[2].panHandlers}>
            <Text>
              2 - {this.state.selectedColor[0]} {this.state.selectedColor[1]} {this.state.selectedColor[2]}
            </Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}