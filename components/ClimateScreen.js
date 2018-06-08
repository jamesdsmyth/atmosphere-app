import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import WeatherSvg from './WeatherSvg';
import styles from '../assets/styles/styles';

//
// ClimateScreen contains 2 sections (ClimateList, CompareColorList)
// Only one is shown at a time depending on the actions of the user.
// openColor, closeColor are both functions and passed to ClimateList
// Clicking either of these functions will animate both sections to show
// either one or the other.
//

export default class ClimateScreen extends Component {

  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      climateList: true,
      compareColorList: false,
      currentColor: {
        r: 201,
        g: 218,
        b: 85
      },
      lighterColor: {
        r: 201,
        g: 218,
        b: 85
      },
      darkerColor: {
        r: 201,
        g: 218,
        b: 85
      }
    }

    this.openColor = this.openColor.bind(this);
    this.closeColor = this.closeColor.bind(this);
    this.createCompareColorListColors = this.createCompareColorListColors.bind(this);
    this.onClickColor = this.onClickColor.bind(this);
    
  }
  
  openColor() {

    // need to get the color clicked

    // need to set currentColor here.
    this.setState({
      climateList: false,
      compareColorList: true
    });

    this.createCompareColorListColors();
  }

  closeColor() {
    this.setState({
      climateList: true,
      compareColorList: false
    });
  }

  onClickColor(color) {
    console.log(color);
    alert('color clicked');
  }

  createCompareColorListColors() {
    let color = this.state.currentColor;

    let lighter = Object.assign({}, color);
    lighter.r = lighter.r - 30;

    let darker = Object.assign({}, color);
    darker.r = darker.r + 30;

    this.setState({
      lighterColor: lighter,
      darkerColor: darker
    });
  }
  
  render() {

    const { weather } = this.props;

    return (
      <View>
      {
        weather.list.map((x, i) => {

          while(i < 6) {
            const temperature = Math.round(x.main.temp - 273.15);
            
            const updatedTemperature = temperature < 0 ? temperature + 100 : temperature;
            const sectionTemperature = styles[`section${updatedTemperature}`];
            const timeArray = x.dt_txt.split('');
            const strippedTime = timeArray.slice(timeArray.length - 8, timeArray.length - 3);
      
            // deciding on the section classes
            let sectionClass = i === 0 ? styles.sectionNow : styles.sectionLater;
      
            return  <View
                      style={[styles.section, sectionClass, sectionTemperature]}
                      key={i}
                    >
                      {
                        i === 0 ?
                        <View>
                          <View style={styles.sectionInner} key={i}>
                            <Text style={styles.sectionText} key={i}>
                              {temperature}&#176;c and {x.weather[0].main.toLowerCase()} right now
                            </Text>
                            <WeatherSvg weatherType={x.weather[0].main} />
                          </View>
                          <Button
                            title="Go to Details"
                            onPress={() => this.props.navigation.navigate('Details')}
                          />
                        </View>
                        :
                        <View style={styles.sectionInner} key={i}>
                          <Text style={styles.sectionText} key={i}>
                            {temperature}&#176;c at {strippedTime}
                          </Text>
                          <WeatherSvg weatherType={x.weather[0].main} />
                        </View>
                      }
                    </View>;
          }
        })
      }
      </View>
    )
  }
}