import * as types from '../constants/actionTypes';

export const weather = (state = {name: 'jamessss'}, action) => {
  switch(action.type) {
    // case types.ADD_WEATHER:
    case 'API_CALL_SUCCESS':
      console.log('success in request');
      return Object.assign({}, state, action.data);

    case 'API_CALL_ERROR':
      console.log('error in request');
      return state;

    default:
      return state;
  }
}