import React from 'react';
import Paper from 'material-ui/Paper'

const styles = {
    paperStyle: {
    height: 40,
    width: 270,
    display: 'inline-block',
    marginLeft:350,
    marginTop: 30,
  },
};

const analysisTotal = () => (
  /*
    <Paper id="paper" zDepth={5} >
      <p id="info">
        Total: 500   Cmp: 130%
      </p>   

    </Paper>
    */
  <div id="analysisTotalDiv">

    <h1> 
      Total: 500   Cmp: 130%
    </h1>
    
  </div>
);

export default analysisTotal