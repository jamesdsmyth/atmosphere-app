import React from 'react';
import { View, Animated, Text, TouchableHighlight } from 'react-native';
import styles from '../assets/styles/styles';

export default CompareColorList = ( { closeColor, isVisible } ) => (
  <Animated.View style={[styles.section, { top: isVisible }]}>
    <View style={styles.sectionInner}>
      <TouchableHighlight
        onPress={() => closeColor()}>
        <Text style={styles.loadingText}>Close color</Text>
      </TouchableHighlight>
    </View>
  </Animated.View>
)