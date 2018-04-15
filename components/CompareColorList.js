import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

export default CompareColorList = ( { closeColor } ) => (
  <TouchableHighlight
    onPress={() => closeColor()}>
    <Text>Close color</Text>
  </TouchableHighlight>
)