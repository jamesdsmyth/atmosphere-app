import { takeEvery, call, all, put } from 'redux-saga/effects';
import axios from 'axios';

// our worker saga
export function* createLessonAsync() {

  try {
    // trying to call our api
    // const ceilingLat = Math.floor(position.coords.latitude);
    // const ceilingLng = Math.floor(position.coords.longitude);
    // const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${ceilingLat}&lon=${ceilingLng},&mode=json&appid=fb161b8bdfd1a946ed269b0b2cf42b77`;  
    
    const url = 'https://jsonplaceholder.typicode.com/users'

    // axios will take 2 or 3 arguments. the method (axios.get/axios.post, url, arguments);
    const response = yield call(axios.get, url);
    console.log(response);
  } catch(error) {
    // throwing an error from our api
    console.log('request failed', error);
  }
}

// our watcher saga
export function* watchCreateLesson() {
  console.log('redux saga is running the createLesson action listener');
  yield takeEvery('API_CALL_REQUEST', createLessonAsync);
}

// single entry point to start all our sagas at once
export default function* rootSaga() {
  yield all([
    watchCreateLesson()
  ])
}