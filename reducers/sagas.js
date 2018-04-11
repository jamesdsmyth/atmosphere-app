import { takeEvery, call, all, put } from 'redux-saga/effects';
import axios from 'axios';

// our worker saga
export function* createLessonAsync() {

    try {

      // navigator.geolocation.getCurrentPosition(function(position) {
      //   const ceilingLat = Math.floor(position.coords.latitude);
      //   const ceilingLng = Math.floor(position.coords.longitude);
      // });

      let lat = 37;
      let lng = -123;
      
      const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng},&mode=json&appid=fb161b8bdfd1a946ed269b0b2cf42b77`;  
      
      // axios will take 2 or 3 arguments. the method (axios.get/axios.post, url, arguments);
      const response = yield call(axios.get, url);

      // passing action of type and response
      yield put({ 'type': 'API_CALL_SUCCESS', response: response.data });
    } catch(error) {
      
      // throwing an error from our api
      yield put({ 'type': 'API_CALL_ERROR', response: response.error });
    }
  // });


}

// our watcher saga
export function* watchCreateLesson() {
  yield takeEvery('API_CALL_REQUEST', createLessonAsync);
}

// single entry point to start all our sagas at once
export default function* rootSaga() {
  yield all([
    watchCreateLesson()
  ])
}