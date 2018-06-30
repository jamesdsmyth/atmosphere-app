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
      selectedColor: [100, 150, 200],
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

  // when the component mounts we can position the correct location of the square
  componentDidMount() {
    // this.positionSquare();
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
        },

        onPanResponderMove: (e, gestureState) => {
          this.setState({
            [`circle${i}PosX`]: gestureState.moveX,
            [`circle${i}PosY`]: gestureState.moveY,
            currentPan: i
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

  positionSquare() {
    // here we need to position the square in the correct RGB position.
    // so depending on the RGB values being passed through,
    // [234, 94, 123]. 
    // 812H 375W.
    // const b = (812*812) + (375*375);
    // console.log(Math.sqrt(b)); // 894
    // W H then the diagonal value of the screen. So 

    // this.state.pan.setOffset({x: this.state.selectedColor[0], y: this.state.selectedColor[1]});
    // console.log(this.state.selectedColor[0], this.state.selectedColor[1], this.state.selectedColor[2]);

    // setting position of square on the grid

    const pixelW = this.state.width / 255;
    const squarePosW = pixelW * this.state.selectedColor[0];

    const pixelH = this.state.height / 255;
    const squarePosH = pixelH * this.state.selectedColor[1];

    // this now has positioned the square on the screen.
    // we now will only calculate the diagonal when we need to change thw background color
    this.state.pan.one.setOffset({x: 200, y: squarePosH});
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
    // Destructure the value of pan from the state
    let { pan, scale } = this.state;

    // Calculate the x and y transform from the pan value
    // we need to work out which one we are looking at here.
    let [translateX, translateY] = [pan[Object.keys(pan)[0]].x, pan[Object.keys(pan)[0]].y];
    let rotate = '0deg';

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

    return (
      <View style={styles.container}>
        <View
          style={
            [
              styles.section, 
              styles.sectionThird, 
              { 'backgroundColor': `rgb(${this.state.selectedColor[0]}, ${this.state.selectedColor[1]}, ${this.state.selectedColor[2]})`}
            ]}>
          <Animated.View style={[styles.colorPicker, imageStyle]} {...this.state.pans[0].panHandlers}>
            <Text>
              0 - {this.state.selectedColor[0]} {this.state.selectedColor[1]} {this.state.selectedColor[2]}
            </Text>
          </Animated.View>

          <Animated.View style={[styles.colorPicker, imageStyle]} {...this.state.pans[1].panHandlers}>
            <Text>
              1 - {this.state.selectedColor[0]} {this.state.selectedColor[1]} {this.state.selectedColor[2]}
            </Text>
          </Animated.View>

          <Animated.View style={[styles.colorPicker, imageStyle]} {...this.state.pans[2].panHandlers}>
            <Text>
              2 - {this.state.selectedColor[0]} {this.state.selectedColor[1]} {this.state.selectedColor[2]}
            </Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}