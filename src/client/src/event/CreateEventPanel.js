import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import TextField from 'material-ui/TextField';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './CreateEventPanel.css';
import styles from './CreateEventPanelStyle'

class CreateEventPanel extends React.Component {
  state = {
    checked: false,
  }

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  buttonClicked() {
    alert('You clicked the button.');
    console.log('works fine');
  }

  render() {
    return ( 

      
      
      <div id = "pageDiv">
        <h1>CREATE PAGE</h1>
        <h2>Start a New Event</h2>
        
        <TextField  
            hintText="Event Name"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        />
        <br />
        <TextField  
            hintText="Event Type"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        />
        <br />
        <TextField  
            hintText="Event Time"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        />
        <br />
        <TextField  
            hintText="Event Location"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        />
        <br />
        <TextField  
            hintText="Split Type"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        /><br />
        <br />
        

        <TextField  
            hintText="Enter a member's name"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        />
        <br />
      

        


        <TextField  
            hintText="Type an email address to add"
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            floatingLabelText="Add a new person"
            floatingLabelStyle={styles.floatingLabelStyle2}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        /><br />
        <br />
        
        <div>

          <FlatButton id="FlatButtonSize"        
            label="+Add a person to the list"
            style = {styles.labelStyle}
            onClick={this.buttonClicked.bind(this)}

          />
        </div>    

         <br />
        
        <RaisedButton label="Cancel" style={styles.buttonStyle} onClick={this.buttonClicked.bind(this)} />
        <RaisedButton label="Create" style={styles.buttonStyle} onClick={this.buttonClicked.bind(this)} />
        
         
       </div>




      
    );
  }
}

export default CreateEventPanel;