import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Switch, Route,Link } from 'react-router-dom'

import Sidebar from './Sidebar';
import Signup from '../signup/Signup';
import Login from '../login/Login';




function handleTouchTap() {
  alert('onClick triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: '100px',
    width:'100px'
  },
};

const rightButtons = (
    <div>
      <FlatButton label="Sign up"  style={styles.buttonStyle} containerElement={<Link to="/Signup"/>} />
      <FlatButton label="Sign in"  style={styles.buttonStyle} containerElement={<Link to="/Login"/>}/>


      <Switch>
          <Route path='/Signup' component={Signup} />
          <Route path='/Login' component={Login} />     
      </Switch>

    
    </div>
  );






const TopBar = () => (
  <div>
	  <AppBar
	    title={<span style={styles.title}>WeCheck</span>}
	    onTitleTouchTap={handleTouchTap}
	    iconElementRight={rightButtons}
	  />
    
  </div>

);

export default TopBar;