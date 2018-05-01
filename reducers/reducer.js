export function reducer(state = {} , action) {

  console.log('action', action.type);

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

    case 'GEOLOCATION_CALL_SUCCESS':
      return { 
        ...state, 
        fetching: false, 
        error: false,
        geolocation: action.response
      }

      break;

    case 'GEOLOCATION_CALL_FAILURE':
      return { 
        ...state, 
        fetching: false, 
        error: true,
        geolocation: false
      }

      break;

    default:
      return state;
  }
}