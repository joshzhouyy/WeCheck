// working code
// import React from 'react';
// import AppBar from 'material-ui/AppBar';
// import FlatButton from 'material-ui/FlatButton';
// import Drawer from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// import App from '../app/App';
// import WelcomePage from '../event/WelcomePage';




// const styles = {
//   title: {
//     cursor: 'pointer',
//     postion: 'relative'
//   },
//   buttonStyle: {
//     backgroundColor: 'transparent',
//     color: 'white',
//     fontSize: '1em',
//     height:'2em',
//   },
// };

// const rightButtons = (onClick) => (
//     <div>
//       <FlatButton label="Sign Out"  style={styles.buttonStyle} onClick={() => onClick()}/>
//     </div>
//   );



// const Topbar = ({onClick}) => (
//   <MuiThemeProvider>
//     <div id="topBar">
//       <AppBar
//         title={<span style={styles.title}>WeCheck</span>}
//         iconElementRight={rightButtons(onClick)}
//       />
//     </div>
//   </MuiThemeProvider>
// );

// export default Topbar;

// // buggy code #25 #12
import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '../app/App';
import WelcomePage from '../event/WelcomePage';

function handleTouchTap() {
  alert('onClick triggered on the title component');
}


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

const rightButtons = (onClick) => (
    <div>
      <FlatButton label=""  style={styles.buttonStyle} onClick={() => onClick()}/>
    </div>
  );



const Topbar = ({onClick}) => (
  <MuiThemeProvider>
    <div id="topBar">
      <AppBar
        title={<span style={styles.title}>WeCheck</span>}
        onTitleTouchTap={handleTouchTap}
        iconElementRight={rightButtons(onClick)}
      />
    </div>
  </MuiThemeProvider>
);

export default Topbar;



