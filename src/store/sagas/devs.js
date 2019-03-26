import { call, put, select } from 'redux-saga/effects';
import { gitHub } from '../../services/api';
import { Creators as DevsActions } from '../ducks/devs';
import { Creators as NewDevFormActions } from '../ducks/newDevForm';

export function* addDev(action) {
  try {
    const { data: devData } = yield call(gitHub.get, `/users/${action.payload.user}`);

    const isDuplicated = yield select(state => state.devs.data.find(dev => dev.id === devData.id));

    if (isDuplicated) {
      yield put(DevsActions.addDevFailure());
    } else {
      const newDev = {
        id: devData.id,
        login: devData.login,
        avatar_url: devData.avatar_url,
        name: devData.name,
        html_url: devData.html_url,
        cordinates: action.payload.cordinates,
      };

      yield put(DevsActions.addDevSuccess(newDev));
      yield put(NewDevFormActions.hideNewDevForm());
    }
  } catch (err) {
    yield put(DevsActions.addDevFailure());
  }
}
