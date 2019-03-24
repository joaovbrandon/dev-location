import { put } from 'redux-saga/effects';

import { Creators as ExampleActions } from '../ducks/example';

export function* changeExample(action) {
  yield put(ExampleActions.otherChangeExample(action.payload.text));
}
