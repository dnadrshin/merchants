import { applyMiddleware, createStore } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware} from 'react-router-redux';
import reducers from './reducers';

const logger = createLogger({});
const history = createHistory();
const middleware = routerMiddleware(history);

const configureStore = (preloadedState) => createStore(
    reducers(preloadedState),
    applyMiddleware(middleware, thunk, logger),
  );

export default configureStore;
export {history};
