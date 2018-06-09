import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import WeatherSvg from './WeatherSvg';
import styles from '../assets/styles/styles';

export default class ColorScreen extends Component {
  render() {

    const { navigation } = this.props;
    const temperature = navigation.getParam('temperature');
    const weatherType = navigation.getParam('weatherType');
    const sectionTemperature = styles[`section${temperature}`];

    return (
      <View style={[styles.section, sectionTemperature]}>
        <View style={styles.sectionInner}>
          <Text style={styles.sectionText}>
            {temperature}&#176;c and {weatherType.toLowerCase()} right now
          </Text>
          <WeatherSvg weatherType={weatherType} />
        </View>
        <Text style={styles.sectionText}>
          Does this color match how it feels outside?
        </Text>
        <Button 
          title="Yes"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button 
          title="No"
          onPress={() => this.props.navigation.navigate('MultipleColorScreen')} 
        />
      </View>
    )
  }
}