import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// promise that will return the geolocation of the user
const getUserLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    location => resolve(location),
    error => reject(error),
  )
});

function* getGeolocation() {

  const location = yield call(getUserLocation)

  const coords = {
    lat: Math.floor(location.coords.latitude),
    lng: Math.floor(location.coords.longitude)
  }

  try {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng},&mode=json&appid=fb161b8bdfd1a946ed269b0b2cf42b77`;  
    
    // axios will take 2 or 3 arguments. the method (axios.get/axios.post, url, arguments);
    const response = yield call(axios.get, url);

    // passing action of type and response
    yield put({ 'type': 'API_CALL_SUCCESS', response: response.data });
  } catch(error) {
    
    // throwing an error from our api
    yield put({ 'type': 'API_CALL_ERROR', response: 'error' });
  } 
}

function* getColors() {
  
}

// this is called when API_CALL_REQUEST is dispatched
export function* watchGetWeather() {
  yield getGeolocation();
}

// this is called when API_CALL_REQUEST_COLORS is dispatched
export function* watchGetMoreColors() {
  yield getColors();
}

// single entry point to start all our sagas at once
export default function* rootSaga() {
  yield takeLatest('API_CALL_REQUEST', watchGetWeather);
  yield takeLatest('API_CALL_REQUEST_COLORS', watchGetMoreColors);
}