import * as types from '../constants/actionTypes';

export const addWeather = (data) => ({
  type: types.ADD_WEATHER,
  data
});