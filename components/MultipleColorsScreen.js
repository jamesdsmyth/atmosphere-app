import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class MultipleColorsScreen extends Component {
  
  render() {
    const { navigation } = this.props;
    console.log('inside multiple', navigation);
    return (
      <Text>
        This page should display 3 new colors
      </Text>
    )
  }
}