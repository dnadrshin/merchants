/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import merchantsRest from './Merchants/rest';
import bidsRest from './Bids/rest';
import formReducer from './generic/Form/reducers';
import tableReducer from './generic/Table/reducers';
import modalReducer from './generic/Modal/reducers';
import merchantsReducer from './generic/RestAPI/reducers';

export default () => {
  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  return combineReducers({
    form : formReducer,
    modal: modalReducer,

    rest: combineReducers({
      ...merchantsRest.reducers,
      ...bidsRest.reducers,
    }),

    merchants: merchantsReducer,
    routing  : routerReducer,
    table    : tableReducer,
  });
};
