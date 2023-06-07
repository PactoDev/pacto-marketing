/* eslint-disable import/no-import-module-exports */
import {
  createStore, applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga';

// const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  // applyMiddleware(sagaMiddleware),
);

// sagaMiddleware.run();

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(reducer);
  });
}

export default store;
