import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { Router } from 'react-router';

import rootReducer from './app/reducers'
import Routes from './routes';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(rootReducer, applyMiddleware(...middleware));
console.log(store.getState())

const WeCheck = () => (
  <Provider store={store}>
    <Router children={Routes} history={browserHistory} />
  </Provider>
);

// console.log(store.getState())

ReactDOM.render(
    <WeCheck />,
  	document.getElementById('root')
);
