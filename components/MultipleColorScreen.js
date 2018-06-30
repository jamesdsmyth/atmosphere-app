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
      circle1PosX: 0,
      circle1PosY: 0,
      circle2PosX: 0,
      circle2PosY: 0,
      circle3PosX: 0,
      circle3PosY: 0,
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
          console.log(gestureState.moveX, gestureState.moveY);  
          this.setState({
            circle1PosX: gestureState.moveX,
            circle1PosY: gestureState.moveY
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

    // // get position of the circle.
    // const positionX = this.state.circle1PosX;
    // const positionY = this.state.circle1PosY;
    // const positionD = Math.sqrt((positionX * positionX) + (positionY * positionY)); // diagonal position of the screen rectangle

    // // 255 is the RBG color limits. So we divide 255 by the width, height and diagonal to know what to multiply the position by
    // const fractionX = 255 / this.state.width;
    // const fractionY = 255 / this.state.height;
    // const fractionD = 255 / Math.sqrt((this.state.width * this.state.width) + (this.state.height * this.state.height));

    // // finally we round multiply the fractions by the position to get a 255 limit value
    // const r = Math.round(fractionX * positionX);
    // const g = Math.round(fractionY * positionY);
    // const b = Math.round(fractionD * positionD);

    const positionX = Math.round(this.state.circle1PosX);
    const positionY = Math.round(this.state.circle1PosY);

    const y = Math.round((255 / this.state.height) * this.state.circle1PosY);

    console.log(positionX, y);
    
    const arr = [100, 100, y];
    this.setState({
      selectedColor: arr
    });
  }

  render() {
    // Destructure the value of pan from the state
    let { pan, scale } = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan[Object.keys(pan)[0]].x, pan[Object.keys(pan)[0]].y];
    let rotate = '0deg';

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

    return (
      <View style={styles.container}>
        <View
          style={[styles.section, styles.sectionThird, { 'backgroundColor': `rgb(${this.state.selectedColor[0]}, ${this.state.selectedColor[1]}, ${this.state.selectedColor[2]})`}]}>
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