import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";
import { reducer } from './reducer';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// run the root saga
sagaMiddleware.run(rootSaga);

export default store;