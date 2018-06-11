export function reducer(state = {} , action) {

  console.log('action', action.type);

  switch (action.type) {

    case ' API_CALL_REQUEST_COLORS':
      return { 
        ...state, 
        fetching: true, 
        error: false,
        weather: false
      }

    case 'API_CALL_REQUEST':
      return { 
        ...state, 
        fetching: true, 
        error: false,
        weather: false
      }
      
    case 'API_CALL_SUCCESS':
      return { 
        ...state, 
        fetching: false, 
        error: false,
        weather: action.response
      }

    case 'API_CALL_ERROR':
      return { 
        ...state, 
        fetching: false, 
        error: true,
        weather: false
      }

    case 'GEOLOCATION_CALL_SUCCESS':
      return { 
        ...state, 
        fetching: false, 
        error: false,
        geolocation: action.response
      }

    case 'GEOLOCATION_CALL_FAILURE':
      return { 
        ...state, 
        fetching: false, 
        error: true,
        geolocation: false
      }

    default:
      return state;
  }
}