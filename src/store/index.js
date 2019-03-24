import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { IS_DEV } from '../config';
import reactotron from '../config/reactotron';
import reducers from './ducks';
import sagas from './sagas';

const middlewares = [];

const sagaMonitor = IS_DEV ? reactotron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const composer = IS_DEV
  ? compose(
    applyMiddleware(...middlewares),
    reactotron.createEnhancer(),
  )
  : compose(applyMiddleware(...middlewares));

const store = createStore(reducers, composer);

sagaMiddleware.run(sagas);

export default store;
