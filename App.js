import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      weather: null,
      loaded: false
    }
  }

  apiCall = () => {

    // using fetch() to get the weatrher data
    navigator.geolocation.getCurrentPosition(position => {
  
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
  
          // console.log(json);

          
        // const v = json.map((x, i) => {
        //   let newClass = `segment s-${i}`;
        //   let temperature = Math.round(x.main.temp - 273.15);
        //   return x;
        // });

          // console.log(json);

          this.setState({
            weather: json,
            loaded: true
          });
  
          // Store.dispatch(populateWeather(json));
        
        } catch(error) {
          console.log('error');
        }
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
              const sectionClass = i === 0 ? styles.sectionNow : styles.sectionLater;
              let temperature = Math.round(x.main.temp - 273.15);
   
              return  <View style={[styles.section, sectionClass]} key={i}>
                        {
                          i === 0 ? 
                            <Text style={styles.sectionText} key={i}>
                              {temperature}&#176; now
                            </Text> :
                            <Text style={styles.sectionText} key={i}>
                              {temperature}&#176; in {i}hr
                            </Text>
                        }
                        
                        {
                          i === 0 && 
                            <Text style={styles.sectionText}>{city}</Text>
                        }
                      </View>;
            }
          })
        }
      </View>
    );
  }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width
  },
  // sphere: {
  //   backgroundColor: '#83c359',
  //   width: window.width - 10,
  //   height: window.width - 10,
  //   borderRadius: window.width / 2
  // }
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
  sectionLatest: {
    backgroundColor: '#cb9326',
    flex: 2.5
  },
  sectionText: {
    fontSize: 20,
    color: '#ffffff'
  }
});