import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware} from 'react-router-redux'

const logger = createLogger({});
const history = createHistory();
const middleware = routerMiddleware(history)

const configureStore = (preloadedState) => {

  return createStore(
    reducers(preloadedState),
    applyMiddleware(middleware, thunk, logger)
  );
};

export default configureStore;
export {history};
