import { take, call, all, put, dispatch, request } from 'redux-saga/effects';
import axios from 'axios';
import { RotationGestureHandler } from 'react-native-gesture-handler';

function* geolocation() {
  // return navigator.geolocation.getCurrentPosition(function(response) {
  //   return response;
  // });
  return navigator.geolocation.getCurrentPosition(function(response) {
      return response;
    });
}


function* getGeolocation() {

  // const geo = yield geolocation();
  const geo = yield call(geolocation);

  const coords = {
    lat: Math.floor(geo.latitude),
    lng: Math.floor(geo.longitude)
  }

  console.log('the result of b is', geo);

  const weather = yield request(`http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng},&mode=json&appid=fb161b8bdfd1a946ed269b0b2cf42b77`);
  console.log('the weather is', weather);
  // try {

  //   // need to wrap this in a navigator.geolocation request here.
  //   const coords = {};
  //   coords.lat = 40;
  //   coords.lng = -74;
    
  //   const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng},&mode=json&appid=fb161b8bdfd1a946ed269b0b2cf42b77`;  
    
  //   // axios will take 2 or 3 arguments. the method (axios.get/axios.post, url, arguments);
    
  //   const response = yield call(axios.get, url);

  //   console.log(response);

  //   // passing action of type and response
  //   yield put({ 'type': 'API_CALL_SUCCESS', response: response.data });
  // } catch(error) {
    
  //   // throwing an error from our api
  //   yield put({ 'type': 'API_CALL_ERROR', response: 'error' });
  // }
}

// our watcher saga
export function* watchCreateWeather() {
  const it = getGeolocation();
  // it.next();
}

// single entry point to start all our sagas at once
export default function* rootSaga() {
  yield all([
    watchCreateWeather()
  ])
}