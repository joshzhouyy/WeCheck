import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'

// import todoApp from './reducers'
import App from './app/App'


// let store = createStore(todoApp);

// ReactDOM.render(
// 	<Provider store={store}>
//     	<App />
//   	</Provider>,
//   	document.getElementById('root')
// );

const WeCheck = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(
    <WeCheck />,
  	document.getElementById('root')
);
