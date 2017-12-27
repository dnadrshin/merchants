import { combineReducers } from 'redux';
import merchantsRest from './Merchants/rest';
import formReducer from './generic/Form/reducers';
import tableReducer from './generic/Table/reducers';
import modalReducer from './generic/Modal/reducers';
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
    form: formReducer,
    modal: modalReducer,

    rest: combineReducers({
      ...merchantsRest.reducers,
    }),

    routing: routerReducer,
    table: tableReducer,
  })
}