import React from 'react';
import { View, Animated, Text, TouchableHighlight } from 'react-native';
import styles from '../assets/styles/styles';

export default CompareColorList = ( { closeColor, isVisible, onClickColor, colors } ) => {

  console.log('this colors', colors, isVisible);
  return (
    isVisible &&
    <View>
      {
        colors.map((color, i) => {
          return <View 
            style={[styles.section, styles.sectionLater, { 'backgroundColor': `rgb(${color.r}, ${color.g}, ${color.b})`}]}
            onPress={() => onClickColor()}
            key={i}
          >
            <Text>{color.r}</Text>
          </View>
        })
      }
    </View>
  )
}