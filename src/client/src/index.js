import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App'
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
      <App />
    </Provider>
  </BrowserRouter>
);

// console.log(store.getState())

ReactDOM.render(
    <WeCheck />,
  	document.getElementById('root')
);
