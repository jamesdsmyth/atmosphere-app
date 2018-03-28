import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { watcherSaga } from "./sagas";
import { weather } from './weather';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  weather,
  applyMiddleware(sagaMiddleware)
)

// run the saga
sagaMiddleware.run(watcherSaga);

export default store;