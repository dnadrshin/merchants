import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import reducers from './reducers';

const logger = createLogger({}),
  history = createHistory(),
  middleware = routerMiddleware(history),

  configureStore = (preloadedState) => createStore(
    reducers(preloadedState),
    applyMiddleware(middleware, thunk, logger),
  );

export default configureStore;
export {history};
