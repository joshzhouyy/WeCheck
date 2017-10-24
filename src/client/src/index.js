import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

const store = createStore(rootReducer, applyMiddleware(thunk));

import CreateEventPanel from './event/CreateEventPanel'

  // let store = createStore(actions);


const WeCheck = () => (
  /*
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  */
  
  <MuiThemeProvider>
    <CreateEventPanel />
  </MuiThemeProvider>
  
);

ReactDOM.render(
    <WeCheck />,
  	document.getElementById('root')
);
