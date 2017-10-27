import React from 'react';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import {orange500, blue500, indigo900, black, orange800, orange100, indigo100, teal100, amberA400, red200} from 'material-ui/styles/colors'

import EventBillSumChart from './EventBillSumChart'
import './EventMemberPanel.css'


const updateCheck = () => {
  
  this.setState((oldState) => {
    return {
      checked: !oldState.checked,

    };
  });
}

const buttonClicked = () => {
  
    alert('You clicked the button.');
    console.log('works fine');
    
    //console.log('this is:', this);
}


const raisedBtn = (isCreator) => {
  if (!isCreator) {
    return (
      <div id="memberBtnsDiv">
        <RaisedButton label={'Input Expense'} primary={true} className="raisedBtns" />
      </div>  
    );
  } else {
      return (
      
        <div id="creatorBtnsDiv">
          <RaisedButton label={'Add'} primary={true} className="creatorBtns" />
          <RaisedButton label={'Verify'} secondary={true} className="creatorBtns" />
          <RaisedButton label={'Edit'} primary={true} className="creatorBtns" />
        </div>

      );  
    
  }
}

const BillSum = (totalSum) => {
  let info = "Bill Sum: "+ totalSum;
  return (<h3>{info}</h3>);
}

const EventMemberList = (isCreator) => {

  const checked = false;
  if (!isCreator) {
    return (
        <div id="memberListContainerDiv">
        <Subheader>Member List</Subheader>
        
          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label="Xiaohua Shi"
            //onCheck={this.buttonClicked.bind(this)}
            defaultChecked={checked}
            onCheck={updateCheck}
          />
        
          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label="Mengxue Luo"
            defaultChecked={checked}
            onCheck={updateCheck}
          />
        
        <div id="memberListButtonDiv">
          <RaisedButton 
            label="+" 
            backgroundColor={teal100}
            className="memberAddBtn"
            style={{ fontSize: '1.5rem' }}
            onClick={buttonClicked.bind(this)}
          /> 
          
        </div>
          
      </div>

      );
  } else {
    return (  

      <div id="memberListContainerDiv">
        <Subheader>Member List</Subheader>
        
          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            defaultChecked={checked}
            label="Xiaohua Shi"
            
          />
        
          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            defaultChecked={checked}
            label="Mengxue Luo"
            
          />
        
        <div id="memberListButtonDiv">
          <RaisedButton 
            label="+" 
            backgroundColor={teal100}
            className="creatorMemberListBtns"
            style={{ fontSize: '1.5rem' }}
            onClick={buttonClicked.bind(this)}
          /> 
          <RaisedButton 
            label="-" 
            backgroundColor={indigo100} 
            className="creatorMemberListBtns"
            style={{ fontSize: '1.5rem' }}
            onClick={buttonClicked.bind(this)}
          />
        </div>
          
      </div>
    );
  }

}
  
 


const EventMemberPanel = ({isCreator}) => {
    console.log(isCreator)
    return(
      <Paper id="eventPanelContainer">
        <Grid id="eventGrid">
          <Row id="eventOuterRow">
            <Col md={9} id="eventInfoCol">
              <Row id="eventBtnRow" className="eventInnerRows">
                <div id="eventBtnContainer">                
                    {raisedBtn(isCreator)}                
                </div>
              </Row>
              <Row id="eventBillSumRow" className="eventInnerRows">
                {BillSum(50)}
              </Row>
              <Row id="eventBillDetailRow" className="eventInnerRows">
                {EventBillSumChart()}
              </Row>
            </Col>
            <Col md={3} id="eventMemberListCol">
                {EventMemberList(isCreator)}
            </Col>
          </Row>
        </Grid> 
      </Paper>
    );
  

}

export default EventMemberPanel;