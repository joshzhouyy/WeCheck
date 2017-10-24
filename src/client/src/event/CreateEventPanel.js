import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './CreateEventPanel.css';
import {styles} from './CreateEventPanelStyle'

class CreateEventPanel extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

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
        
        

      

        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Restaurant" />
          <MenuItem value={2} primaryText="Hotel" />
          <MenuItem value={3} primaryText="Flight" />
          
        </DropDownMenu>


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