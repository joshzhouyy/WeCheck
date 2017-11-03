import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import * as colors from 'material-ui/styles/colors'
import PropTypes from 'prop-types'



const CreateNewEventbtn = ({onClick, activePanel}) => {
  // console.log(onClick)
  // console.log(activePanel)
    return (
         <div id="eventListBtnDiv">
          <RaisedButton 
          label="Create a new event" 
          backgroundColor={colors.orange100}
          className="eventListBtn"
          style={{ fontSize: '1.5rem' }}
          onClick={() => onClick()}
          /> 
        </div>
    );} 



CreateNewEventbtn.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default CreateNewEventbtn;