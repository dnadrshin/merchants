import 'isomorphic-fetch';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import {transformJSONRequest} from '../generic/helpers';

const
  options = () => ({
    headers: {
      'Accept'      : 'application/json',
      'Content-Type': 'application/json',
    },
  });

export default reduxApi({
  merchants: {
    crud       : true,
    url        : '/API/merchants',
    transformer: (resp, prevData, options) => transformJSONRequest(resp, data => data, options),
    options,
  },

  merchant: {
    crud       : true,
    url        : '/API/merchant',
    options,
  },
}).use('fetch', adapterFetch(fetch));
