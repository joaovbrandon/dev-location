import { combineReducers } from 'redux';

import devs from './devs';
import map from './map';
import newDevForm from './newDevForm';

const reducers = combineReducers({ devs, map, newDevForm });

export default reducers;
