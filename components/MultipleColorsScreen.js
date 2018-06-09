import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../assets/styles/styles';

export default class MultipleColorsScreen extends Component {
  
  render() {
    const { navigation } = this.props;
    console.log('inside multiple', navigation);
    return (
      <View style={styles.container}>
        <Text>
          This page should display 3 new colors
        </Text>
      </View>
    )
  }
}