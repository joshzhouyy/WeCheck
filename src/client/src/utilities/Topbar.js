import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Switch, Route,Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '../app/App';
import WelcomePage from '../event/WelcomePage';




const styles = {
  title: {
    cursor: 'pointer',
    postion: 'relative'
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: '1em',
    height:'2em',
  },
};

const rightButtons = (
    <div>
      <FlatButton label="Sign Out"  style={styles.buttonStyle} containerElement={<Link to="/WelcomePage"/>} />
    </div>
  );



const Topbar = () => (
  <MuiThemeProvider>
    <div id="topBar">
      <AppBar
        title={<span style={styles.title}>WeCheck</span>}
        iconElementRight={rightButtons}
      />
    </div>
  </MuiThemeProvider>

);

export default Topbar;