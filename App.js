import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import SVGImage from 'react-native-svg-image';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      weather: null,
      loaded: false
    }
  }

  apiCall = () => {

    // using fetch() to get the weather data
    navigator.geolocation.getCurrentPosition(position => {

      console.log(position);
  
      let ceilingLat = Math.floor(position.coords.latitude);
      let ceilingLng = Math.floor(position.coords.longitude);
      let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${ceilingLat}&lon=${ceilingLng},&mode=json&appid=fb161b8bdfd1a946ed269b0b2cf42b77`;
  
  
      // using async to wrap the await methods.
      // we call apiRequest async function, within this we use the fetch api
      // we await until it returns a promise, we then await until the json has
      // been parsed. Then once that is done we dispatch an action.
      const apiRequest = async () => {

        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(url);

          this.setState({
            weather: json,
            loaded: true
          });
        
        } catch(error) {}
      }
  
      apiRequest();
    });
  }

  render() {

    if(!this.state.loaded) {
      this.apiCall();
    }

    const city = this.state.weather !== null ? this.state.weather.city.name : 'City';
    const weather = this.state.weather !== null ? this.state.weather.list: [];

    return (
      <View style={styles.container}>
        {
          weather.map((x, i) => {
            while(i < 3) {
              const temperature = Math.round(x.main.temp - 273.15);
              const sectionClass = i === 0 ? styles.sectionNow : styles.sectionLater;
              const sectionTemperature = styles[`section${temperature}`];

              return  <View style={[styles.section, sectionClass, sectionTemperature]} key={i}>
                        {
                          i === 0 ? 
                            <Text style={styles.sectionText} key={i}>
                              {temperature}&#176; & {x.weather[0].main.toLowerCase()} right now
                            </Text> :
                            <Text style={styles.sectionText} key={i}>
                              {temperature}&#176; at {x.dt_txt}
                            </Text>
                        }
                        
                        {
                          i === 0 && 
                            <Text style={styles.sectionText}>{city}</Text>
                        }
                <SVGImage
                style={{ width: 3000, height: 30, backgroundColor: 'transparent' }}
                source={require('./assets/Rain-thin.svg')}
                />
                <SvgUri
                  width="200"
                  height="200"
                  source={require('./assets/Snow.svg')} />
              </View>;
            }
          })
        }
      </View>
    );
  }
}

const window = Dimensions.get('window');
const constants = {
  blue: '#2f358f', // 0 -5
  lightBlue: '#0a56a2', // 6 - 10
  lightGreen: '#1aa79d', // 11 - 15
  green: '#17a456', // 16 - 20
  yellow: '#fef036', // 21 - 25
  lightOrange: '#fec42e', // 26 - 30
  orange: '#fd9326', // 31 - 35
  darkOrange: '#f16631', // 36 - 40
  red: '#eb212f', // 41 - 50
}
const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width
  },
  section: {
    width: window.width,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  sectionNow: {
    backgroundColor: '#83c359',
    flex: 5
  },
  sectionLater: {
    backgroundColor: '#c4d24a',
    flex: 2.5
  },
  backgroundImage: {
    width: 100,
    height: 100,
    backgroundColor: '#000000'
  },
  section0: {
    backgroundColor: constants.blue
  },
  section1: {
    backgroundColor: constants.blue
  },
  section2: {
    backgroundColor: constants.blue
  },
  section3: {
    backgroundColor: constants.blue
  },
  section4: {
    backgroundColor: constants.blue
  },
  section5: {
    backgroundColor: constants.blue
  },

  section6: {
    backgroundColor: constants.lightBlue
  },
  section7: {
    backgroundColor: constants.lightBlue
  },
  section8: {
    backgroundColor: constants.lightBlue
  },
  section9: {
    backgroundColor: constants.lightBlue
  },
  section10: {
    backgroundColor: constants.lightBlue
  },

  section11: {
    backgroundColor: constants.lightGreen
  },
  section12: {
    backgroundColor: constants.lightGreen
  },
  section13: {
    backgroundColor: constants.lightGreen
  },
  section14: {
    backgroundColor: constants.lightGreen
  },
  section15: {
    backgroundColor: constants.lightGreen
  },

  section16: {
    backgroundColor: constants.green
  },
  section17: {
    backgroundColor: constants.green
  },
  section18: {
    backgroundColor: constants.green
  },
  section19: {
    backgroundColor: constants.green
  },
  section20: {
    backgroundColor: constants.green
  },

  section21: {
    backgroundColor: constants.yellow
  },
  section22: {
    backgroundColor: constants.yellow
  },
  section23: {
    backgroundColor: constants.yellow
  },
  section24: {
    backgroundColor: constants.yellow
  },
  section25: {
    backgroundColor: constants.yellow
  },

  section26: {
    backgroundColor: constants.lightOrange
  },
  section27: {
    backgroundColor: constants.lightOrange
  },
  section28: {
    backgroundColor: constants.lightOrange
  },
  section29: {
    backgroundColor: constants.lightOrange
  },
  section30: {
    backgroundColor: constants.lightOrange
  },

  section31: {
    backgroundColor: constants.orange
  },
  section32: {
    backgroundColor: constants.orange
  },
  section33: {
    backgroundColor: constants.orange
  },
  section34: {
    backgroundColor: constants.orange
  },
  section35: {
    backgroundColor: constants.orange
  },

  sectionText: {
    fontSize: 20,
    color: '#ffffff'
  }
});