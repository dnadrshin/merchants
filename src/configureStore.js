import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger({});

const configureStore = (preloadedState) => {

  return createStore(
    reducers(preloadedState),
    applyMiddleware(thunk, logger)
  );
};

export default configureStore;
