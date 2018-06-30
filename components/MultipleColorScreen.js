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
      height: Dimensions.get('window').height,
      circle0PosX: 0,
      circle0PosY: 0,
      circle1PosX: 0,
      circle1PosY: 0,
      circle2PosX: 0,
      circle2PosY: 0,
      pans: [this._panResponder, this._panResponder1, this._panResponder2]
    }
  }


  componentWillMount() {
    this.attachPanHandlerEvents();
  }

  // using PanResponders built in functions, we will set up all the event listeners here
  attachPanHandlerEvents() {
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

  // getting the correct RGB values using the position of each of the circles
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
    const rotate = '0deg';
    let b = {
      imageStyle0: {},
      imageStyle1: {},
      imageStyle2: {}
    }

    // here we are looping through each pan and getting the translate and translateY for each one
    for(let i = 0; i < this.state.pans.length; i++) {
      const [translateX, translateY] = [pan[Object.keys(pan)[i]].x, pan[Object.keys(pan)[i]].y];
      b[`imageStyle${i}`] = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};
    }

    return (
      <View style={styles.container}>
        <View
          style={
            [
              styles.section, 
              styles.sectionThird, 
              { 'backgroundColor': `rgb(${this.state.selectedColor[0]}, ${this.state.selectedColor[1]}, ${this.state.selectedColor[2]})`}
            ]}>

            {
              this.state.pans.map((pan, index) => {
                const circleStyle = `imageStyle${index}`;

                return (
                  <Animated.View style={[styles.colorPicker, b[circleStyle]]} {...this.state.pans[index].panHandlers}>
                    <Text>
                      {index === 0 && 'R'}
                      {index === 1 && 'G'}
                      {index === 2 && 'B'}
                    </Text>
                  </Animated.View>
                )
              })
            }
        </View>
      </View>
    );
  }
}