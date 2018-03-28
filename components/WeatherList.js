import React, { Component } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';
import WeatherSvg from './WeatherSvg';
import styles from '../assets/styles/styles';

class WeatherList extends Component {

  constructor() {
    super();
    this.state = {
      weather: null,
      loaded: false,
      loadingFailed: false,
      refreshing: false
    }
  }

  // pulling the screen down will refresh the app
  // setting loaded to false will rerender the view and call the weather API again
  refreshView() {
    this.setState({
      loaded: false
    });
  }

  render() {

    const { weather } = this.props;

    console.log('the weathrerrrrrr', weather);
    return (
      <Text>HIII</Text>
        // <ScrollView 
        //   refreshControl={
        //     <RefreshControl
        //       refreshing={this.state.refreshing}
        //       onRefresh={this.refreshView.bind(this)}
        //     />
        //   }
        //   contentContainerStyle={styles.container}
        // >

        //   {
        //     weather.length === 0 && <Text style={styles.loadingText}>Loading your climate...</Text>
        //   }
          
        //   {
        //     weather.map((x, i) => {
        //       while(i < 6) {
        //         const temperature = Math.round(x.main.temp - 273.15);
        //         const sectionClass = i === 0 ? styles.sectionNow : styles.sectionLater;
        //         const updatedTemperature = temperature < 0 ? temperature + 100 : temperature;
        //         const sectionTemperature = styles[`section${updatedTemperature}`];
        //         const timeArray = x.dt_txt.split('');
        //         const strippedTime = timeArray.slice(timeArray.length - 8, timeArray.length - 3);
  
        //         return  <View 
        //                   style={[styles.section, sectionClass, sectionTemperature]} 
        //                   key={i}
        //                 >
        //                   {
        //                     i === 0 ?
        //                     <View style={[styles.sectionInner]} key={i}>
        //                       <Text style={styles.sectionText} key={i}>
        //                         {temperature}&#176;c and {x.weather[0].main.toLowerCase()} right now
        //                       </Text>
        //                       <WeatherSvg weatherType={x.weather[0].main} />
        //                     </View>:
        //                     <View style={[styles.sectionInner]} key={i}>
        //                       <Text style={styles.sectionText} key={i}>
        //                         {temperature}&#176;c at {strippedTime}
        //                       </Text>
        //                       <WeatherSvg weatherType={x.weather[0].main} />
        //                     </View>
        //                   }
        //                 </View>;
        //       }
        //     })
        //   }
        // </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state
  }
}

export default connect(mapStateToProps)(WeatherList);