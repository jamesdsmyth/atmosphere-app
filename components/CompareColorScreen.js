import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from '../assets/styles/styles';
import PropTypes from 'prop-types';

export default CompareColorScreen = ( { onClickColor, colors } ) => {
  return (
    <View>
      {/* { */}
        {/* colors.map((color, i) => { */}
          <Text>compare color screen</Text>
        {/* <TouchableHighlight 
          //   style={[styles.section, styles.sectionThird, { 'backgroundColor': `rgb(${color.r}, ${color.g}, ${color.b})`}]}
          //   onPress={() => onClickColor()}
          //   key={i}
          // >
          //   <Text>{color.r} {color.g} {color.b}</Text>
          // </TouchableHighlight> */}
        {/* // })
      // } */}
    </View>
  )
}

CompareColorScreen.propTypes = {
  closeColor: PropTypes.func,
  isVisible: PropTypes.bool,
  onClickColor: PropTypes.func,
  colors: PropTypes.array
}