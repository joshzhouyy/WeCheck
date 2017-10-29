import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './app/AppContainer'
import rootReducer from './app/reducers'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(rootReducer, applyMiddleware(...middleware));
console.log(store.getState())

const WeCheck = () => (
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
);

// console.log(store.getState())

ReactDOM.render(
    <WeCheck />,
  	document.getElementById('root')
);
