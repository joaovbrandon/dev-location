import { combineReducers } from 'redux';

import devs from './devs';
import newDevForm from './newDevForm';

const reducers = combineReducers({ devs, newDevForm });

export default reducers;
