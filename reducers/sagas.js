import { takeLatest, call, put } from 'redux-saga/effects';

export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
}

function callWeatherAPI() {

  // using fetch() to get the weather data
  return navigator.geolocation.getCurrentPosition(position => {

    const ceilingLat = Math.floor(position.coords.latitude);
    const ceilingLng = Math.floor(position.coords.longitude);
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${ceilingLat}&lon=${ceilingLng},&mode=json&appid=fb161b8bdfd1a946ed269b0b2cf42b77`;
    
    console.log('calling the weather api');
    const apiCall = fetch(url).then(response => {
      const dataHere = response;
      return dataHere;
    }).catch(error => {
      return { error: true }
    });

    return apiCall;
  });
}

function* workerSaga() {

  try {
    const response = yield call(callWeatherAPI);

    console.log('server response', response)

    yield put({ type: 'API_CALL_SUCCESS', data: response });
  
  } catch(error) {

    console.log('the error is', error);

    yield put({ type: "API_CALL_FAILURE", error });
  }
}