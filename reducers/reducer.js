export function reducer(state = {} , action) {

  console.log(action.type);

  switch (action.type) {
    case 'API_CALL_REQUEST':
      return { 
        ...state, 
        fetching: true, 
        error: false,
        weather: false
      }

      break;
      
    case 'API_CALL_SUCCESS':

      console.log('INSIDE THE SUCCESS REDUCERRRRRRRRR');
      
      return { 
        ...state, 
        fetching: false, 
        error: false,
        weather: action.response
      }

      break;

    case 'API_CALL_ERROR':
      return { 
        ...state, 
        fetching: false, 
        error: true,
        weather: false
      }

      break;

    default:
      return state;
  }
}