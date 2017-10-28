import React from 'react';
import Paper from 'material-ui/Paper'
import {Grid, Row, Col} from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import {orange500, blue500, indigo900, black, orange800, orange100, indigo100, teal100, amberA400, red200} from 'material-ui/styles/colors'

import "./CustomizedCategoryBox.css"


const styles = {
  dropdown: {
    height:66
  },
  floatingLabelStyle: {
    color: indigo900,
  },
  underlineStyle: {
    bottom:9,
    borderColor: black,
  },
};

const customizedCategory = () => (
  <div id="customizedCategoryDiv">
    
    <h1 id="title"> Add custom category </h1>

    
    <TextField  
      hintText="Name"
      hintStyle={styles.floatingLabelStyle}
      underlineStyle={styles.underlineStyle}
    />
    <br />
    <br />

    <RaisedButton 
      label="Submit" 
      backgroundColor={teal100}
      className="submitBtn"
      style={{ fontSize: '1.5rem' }}
    /> 
    
  </div>
);


const CustomizedCategoryBox = () => (
  <Paper id="CustomizedCategoryBoxContainer">
    <Grid id="CustomizedCategoryBoxGrid">
    <Row id="CustomizedCategoryRow">
      {customizedCategory()}
    </Row>
    

  </Grid>
  </Paper>
);

export default CustomizedCategoryBox;