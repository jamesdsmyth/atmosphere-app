// import React, { Component } from 'react';
// import { View, Animated, Image, Text, TouchableHighlight, PanResponder } from 'react-native';
// import styles from '../assets/styles/styles';

// export default class MultipleColorsScreen extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       pan: new Animated.ValueXY()
//     }

//     this._panResponder = {}
//     this.clickColor = this.clickColor.bind(this);
//   }

//   clickColor() {
//     // alert('1')

//     // need to change the color
//   }

//   componentWillMount() {
//     this._panResponder = PanResponder.create({
//       onMoveShouldSetResponderCapture: () => true,
//       onMoveShouldSetPanResponderCapture: () => true,
  
//       // Initially, set the value of x and y to 0 (the center of the screen)
//       onPanResponderGrant: (e, gestureState) => {
//         console.log('1')
//         // Set the initial value to the current state
//         this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
//         this.state.pan.setValue({x: 0, y: 0});
//       },
  
//       // When we drag/pan the object, set the delate to the states pan position
//       onPanResponderMove: Animated.event([
//         null, {dx: this.state.pan.x, dy: this.state.pan.y},
//       ]),
  
//       onPanResponderRelease: (e, { vx, vy }) => {
//         console.log('2')
//         // Flatten the offset to avoid erratic behavior
//         this.state.pan.flattenOffset();
//       }
//     });
//   }





//   // STEPS FOR THIS TO WORK.
//   // Dispatches the color, changes the store of that color and temperature
//   // navigates back to home with the new color replacing the old one.
  
//   render() {
//     const { navigation } = this.props;

//     console.log('inside multiple', navigation);
//     return (
//       <View style={styles.container}>

//       <Animated.View {...this._panResponder.panHandlers}>
//         <Image source={require('../assets/icon.png')} />
//       </Animated.View>
//         {/* <TouchableHighlight 
//           {...this._panResponder.panHandlers}
//           style={[styles.sectionThird, styles.section, { 'backgroundColor': '#dddddd' }]}
//           onPress={() => this.clickColor('#dddddd')}>
//           <Text>
//             Color 1
//           </Text>
//         </TouchableHighlight>
//         <TouchableHighlight 
//           style={[styles.sectionThird, styles.section, { 'backgroundColor': '#cccccc' }]}
//           onPress={() => this.clickColor('#cccccc')}>
//           <Text>
//             Color 2
//           </Text>
//         </TouchableHighlight>
//         <TouchableHighlight 
//           style={[styles.sectionThird, styles.section, { 'backgroundColor': '#eeeeee' }]}
//           onPress={() => this.clickColor('#eeeeee')}>
//           <Text>
//             Color 3
//           </Text>
//         </TouchableHighlight> */}
//       </View>
//     )
//   }
// }








import React, { Component } from 'react';
import { View, Animated, Image, Text, TouchableHighlight, PanResponder } from 'react-native';
import styles from '../assets/styles/styles';

export default class MultipleColorsScreen extends Component {
  constructor() {
    super();

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
        Animated.spring(
          this.state.scale,
          { toValue: 1.1, friction: 3 }
        ).start();
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();
        Animated.spring(
          this.state.scale,
          { toValue: 1, friction: 3 }
        ).start();
      }
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

    return (
      <View style={styles.container}>
        <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
          <Image source={require('../assets/icon.png')} />
        </Animated.View>
      </View>
    );
  }
}