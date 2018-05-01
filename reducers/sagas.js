import { takeEvery, call, all, put, dispatch } from 'redux-saga/effects';
import axios from 'axios';

const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}


function* getGeoLocation() {
  try {

    const response = yield getCurrentPosition();

    yield put({ 'type': 'GEOLOCATION_CALL_SUCCESS', response: response });

  } catch(error) {

    yield put({ 'type': 'GEOLOCATION_CALL_FAILURE', response: 'error' });

  }
}

// our watcher saga
export function* watchCreateWeather() {
  yield takeEvery('API_CALL_REQUEST', getGeoLocation);
}

// single entry point to start all our sagas at once
export default function* rootSaga() {
  yield all([
    watchCreateWeather()
  ])
}