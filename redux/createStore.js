import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
});

function configureStore(initialState) {
  const store = createStore(
    combineReducers({ ...rootReducer }),
    initialState,
    applyMiddleware(thunk, logger)
  )

  return store;
}

export { configureStore }
