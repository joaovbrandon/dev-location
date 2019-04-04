import { combineReducers } from 'redux';

import devs from './devs';
import map from './map';
import newDevForm from './newDevForm';

export default combineReducers({
  devs,
  map,
  newDevForm,
});
