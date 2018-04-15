import React from 'react';
import { View, Animated, Text, TouchableHighlight } from 'react-native';

export default CompareColorList = ( { closeColor, isVisible } ) => (
  <Animated.View style={{ top: isVisible }}>
    <TouchableHighlight
      onPress={() => closeColor()}>
      <Text>Close color</Text>
    </TouchableHighlight>
  </Animated.View>
)