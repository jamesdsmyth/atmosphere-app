import React, { Component } from 'react';
import { View, Animated, Text, Dimensions, PanResponder } from 'react-native';
import styles from '../assets/styles/styles';

export default class MultipleColorsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      selectedColor: this.props.navigation.getParam('selectedColor'),
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      circlePosX: 0,
      circlePosY: 0
    };

    this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
  }

  // when the component mounts we can position the correct location of the square
  componentDidMount() {
    this.positionSquare();
  }

  componentWillMount() {
    this.initPanResponder();
  }

  initPanResponder() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});

        // console.log('grant', gestureState.moveX, gestureState.moveY);
        // Animated.spring(
        //   this.state.scale,
        //   { toValue: 1.1, friction: 3 }
        // ).start();

        // console.log(this.state.pan.x._value, this.state.pan.y._value);
      },

      onPanResponderRelease: (e, gestureState) => {
        // console.log('innnn', gestureState.moveX, gestureState.moveY);
        // this.state.pan.setValue({x: gestureState.moveX, y: gestureState.moveY});
      },

      // When we drag/pan the object, set the delate to the states pan position
      // onPanResponderMove: Animated.event([
      //   null, {dx: this.state.pan.x, dy: this.state.pan.y},
      // ])//,

      onPanResponderMove: (e, gestureState) => {
        console.log('grant', gestureState.moveX, gestureState.moveY);

        this.setState({
          circlePosX: gestureState.moveX,
          circlePosY: gestureState.moveY
        });

        // console.log(e, gestureState);

        // console.log(gestureState.moveX, gestureState.moveY);

        // console.log(this.state.pan.x);
        // console.log(this.state.pan.y);

        Animated.event([null, {
          dx: this.state.pan.x,
          dy: this.state.pan.y,
        }])(e, gestureState); // <<--- INVOKING HERE!

        // now we can call the background color and change it.
        this.updateBackgroundColor();
      },

      // onPanResponderRelease: (e, {vx, vy}) => {
        // Flatten the offset to avoid erratic behavior
        // this.state.pan.flattenOffset();
        // Animated.spring(
        //   this.state.scale,
        //   { toValue: 1, friction: 3 }
        // ).start();
      // }
    });
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
    // console.log('pixel width is -', this.state.width, pixelW);

    const pixelH = this.state.height / 255;
    const squarePosH = pixelH * this.state.selectedColor[1];
    // console.log('pixel height is -', this.state.height, pixelH);
    
    // const pixelDiagonal = Math.sqrt((this.state.height*this.state.height) + (this.state.width*this.state.width));
    // console.log('pixel diagonal is -', pixelDiagonal);


    // this now has positioned the square on the screen.
    // we now will only calculate the diagonal when we need to change thw background color
    this.state.pan.setOffset({x: squarePosW, y: squarePosH});
  }

  // getting the correct RGB values using the position of the square
  updateBackgroundColor() {
    // got position of the circle.
    const positionX = this.state.circlePosX;
    const positionY = this.state.circlePosY;

    // 256.
    const percentX = 256 / this.state.width;
    const percentY = 256 / this.state.height;

    const r = Math.round(percentX * positionX);
    const g = Math.round(percentY * positionY);




    const square = (positionX * positionX) + (positionY * positionY);
    console.log(square);
    const root = Math.sqrt(square);
    console.log('the root', root);
    const partial = 256 / root;
    console.log('the partial is', partial);
    const b = Math.round(256 / Math.sqrt(positionX * positionX) + (positionY * positionY));




    
    console.log(r, g, b);
    
    const arr = [r, g, b];
    this.setState({
      selectedColor: arr
    });
  }

  render() {
    // Destructure the value of pan from the state
    let { pan, scale } = this.state;

    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];
    let rotate = '0deg';

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

    // console.log('selected color is', this.state.pan.x);

    return (
      <View
        style={[styles.section, styles.sectionThird, { 'backgroundColor': `rgb(${this.state.selectedColor[0]}, ${this.state.selectedColor[1]}, ${this.state.selectedColor[2]})`}]}>
        <Animated.View style={[styles.colorPicker, imageStyle]} {...this._panResponder.panHandlers}>
        <Text>{this.state.selectedColor[0]} {this.state.selectedColor[1]} {this.state.selectedColor[2]}</Text>
        </Animated.View>
      </View>
    );
  }
}