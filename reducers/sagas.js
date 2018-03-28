import { takeLatest, call, put } from 'redux-saga/effects';

export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
}

function callWeatherAPI() {
  const response = fetch('https://dog.ceo/api/breeds/image/random');
  return response;
}

function* workerSaga() {
  try {
    const response = yield call(callWeatherAPI);
    const dog = response.data.message;

    yield put({ type: 'API_CALL_SUCCESS', dog });
  } catch(error) {
    
    yield put({ type: "API_CALL_FAILURE", error });
  }
}