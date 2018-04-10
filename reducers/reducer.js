import * as types from '../constants/actionTypes';

export function reducer(state = {}, action) {

  // console.log(action);

  switch (action.type) {
    case 'API_CALL_REQUEST':
      return { ...state, fetching: true, error: null };
      break;
    case 'API_CALL_SUCCESS':
      const bbbb = { ...state, fetching: false, weather: action };
      console.log('this is bbbb', bbbb);
      return bbbb;
      break;
    case 'API_CALL_FAILURE':
      return { ...state, fetching: false, dog: null, error: action.error };
      break;
    default:
      return state;
  }
}