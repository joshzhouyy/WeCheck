import {Route, IndexRoute} from 'react-router';
import React from 'react';

import Home from './app/Home';
import App from './app/App';
import SignUp from './signup/SignUp';
import Login from './login/Login';
import WelcomePage from './event/WelcomePage';

const Routes = (
  <Route path="/" component={Home}>
    <IndexRoute component={WelcomePage} />
    <Route path="/welcome" component={WelcomePage} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={Login} />
    <Route path="/app" component={App} />
  </Route>
);

export default Routes;