import * as types from '../constants/actionTypes';

const weather = (state = {}, action) => {
  switch(action.type) {
    case types.ADD_WEATHER:
      return Object.assign({}, state, action.data);

    default:
      return state;
  }
}

export default weather;