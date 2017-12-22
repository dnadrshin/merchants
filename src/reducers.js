import { compose, combineReducers } from 'redux';
import merchantsRest from './Merchants/rest';
import { routerReducer } from 'react-router-redux';

export default preloadedState => {

const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  return combineReducers({
    rest: combineReducers({
      ...merchantsRest.reducers,
    }),

    routing: routerReducer,
  })
}