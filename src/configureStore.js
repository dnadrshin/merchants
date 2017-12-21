import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import reducers from './reducers';
import {createLogger} from 'redux-logger';
import { routerReducer } from 'react-router-redux';

const logger = createLogger({});

const configureStore = (preloadedState) => {
  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  return createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer,
      ...preloadedState,
      ...compose(
        ...enhancers
      )
    }),
    applyMiddleware(logger)
  );
};

export default configureStore;
