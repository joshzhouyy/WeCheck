import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500, indigo900, black, orange800, orange100, indigo100, teal100, amberA400, red200} from 'material-ui/styles/colors'

const styles = {
  floatingLabelStyle: {
    color: indigo900,
  },
};

const createMemberDialog = () => {
  return (
    <div>
      <TextField
        //hintText="New Member's Email Adress"
        floatingLabelText="New Member's Email Adress"
        floatingLabelStyle={styles.floatingLabelStyle}
      /><br />
    </div>
  );  
}

export default createMemberDialog