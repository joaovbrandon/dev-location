import { all, takeLatest } from 'redux-saga/effects';

import { Types as DevsTypes } from '../ducks/devs';
import { addDev } from './devs';

export default function* rootSaga() {
  yield all([takeLatest(DevsTypes.ADD_DEV_REQUEST, addDev)]);
}
