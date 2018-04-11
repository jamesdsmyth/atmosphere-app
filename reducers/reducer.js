import * as types from '../constants/actionTypes';

export function reducer(state = {}, action) {

  switch (action.type) {
    case 'API_CALL_REQUEST':
      return { ...state, fetching: true, error: null };
      break;
      
    case 'API_CALL_SUCCESS':
      return { ...state, fetching: false, error: null, weather: action.response };
      break;

    case 'API_CALL_FAILURE':
      return { ...state, fetching: false, error: action.error };
      break;

    default:
      return state;
  }
}