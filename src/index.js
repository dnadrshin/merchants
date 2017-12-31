import {Route, Redirect} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import Merchants from './Merchants';
import Bids from './Bids';
import configureStore, {history} from './configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <Route exact path="/" render={() => <Redirect to="/merchants" component={Merchants} />} />
        <Route exact path="/merchants" component={Merchants} />
        <Route exact path="/merchants/:id/bids" component={Bids} />
      </Fragment>
    </ConnectedRouter>
  </Provider>,

  document.getElementById('root'),
);

registerServiceWorker();
