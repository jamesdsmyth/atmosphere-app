import { combineReducers } from 'redux';
import weather from './weather';

const climate = combineReducers({
  weather
});

export default climate;