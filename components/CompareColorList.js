import React from 'react';
import { View, Animated, Text, TouchableHighlight } from 'react-native';
import styles from '../assets/styles/styles';

export default CompareColorList = ( { closeColor, isVisible, onClickColor } ) => (
  <View>
    {/* <TouchableHighlight
      onPress={() => closeColor()}>
      <Text style={styles.loadingText}>X</Text>
    </TouchableHighlight> */}
    <TouchableHighlight 
      style={[styles.section, styles.sectionThird, styles.section22]}
      onPress={() => onClickColor('color')}>
      <Text>1</Text>
    </TouchableHighlight>
    <TouchableHighlight 
      style={[styles.section, styles.sectionThird, styles.section10]}
      onPress={() => onClickColor('color')}>
      <Text>2</Text>
    </TouchableHighlight>
    <TouchableHighlight 
      style={[styles.section, styles.sectionThird, styles.section30]}
      onPress={() => onClickColor('color')}>
      <Text>3</Text>
    </TouchableHighlight>
  </View>
)