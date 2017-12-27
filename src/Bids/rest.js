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
  bids: {
    crud       : true,
    url        : '/API/merchants/:id/bids',
    transformer: (resp, prevData, options) => transformJSONRequest(resp, data => data, options),
    options,
  },
}).use('fetch', adapterFetch(fetch));
