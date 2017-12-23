import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Merchants from './Merchants';
import configureStore from './configureStore';
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <Route exact path="/" component={Merchants}/>
      </Fragment>
    </ConnectedRouter>
  </Provider>,

  document.getElementById('root')
);

registerServiceWorker();
