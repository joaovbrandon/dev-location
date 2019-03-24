import { all, takeLatest } from 'redux-saga/effects';

import { Types as ExampleTypes } from '../ducks/example';
import { changeExample } from './example';

export default function* rootSaga() {
  yield all([takeLatest(ExampleTypes.OTHER_EXAMPLE, changeExample)]);
}
