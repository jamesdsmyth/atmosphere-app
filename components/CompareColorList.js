import React from 'react';
import { View, Animated, Text, TouchableHighlight } from 'react-native';
import styles from '../assets/styles/styles';

export default CompareColorList = ( { closeColor, isVisible, onClickColor, colors } ) => {

  console.log('this colors', colors, isVisible);
  return (
    isVisible &&
    <View style={styles.section}>
      {
        colors.map((color, i) => {
          return <View 
            style={[styles.section, styles.sectionThird, { 'backgroundColor': 'rgb(201, 218, 85)'}]}
            onPress={() => onClickColor()}
            key={i}
          >
            <Text>breshhh {color}</Text>
          </View>
        })
      }
    </View>
  )
}