import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {orange500, blue500, indigo900, black, orange800, orange100, indigo100, teal100, amberA400, red200} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import './EventMemberPanel.css';

function handleRequestDelete() {
  alert('You clicked the delete button.');
}

function handleTouchTap() {
  alert('You clicked the Chip.');
}

const styles = {

  billSummaryStyle: {
    //1200, 740
    height: 1150,
    width: 1040,
    margin: 0,
    //textAlign: 'center',
    display: 'inline-block'
  },
  memberListStyle: {
    height: 1150,
    width: 540,
    margin: 0,
    //textAlign: 'center',
    display: 'inline-block'

  },
  eventListStyle: {
    height: 1150,
    width: 640,
    margin: 0,
    //textAlign: 'center',
    display: 'inline-block'

  },
  buttonStyle: {
    margin: 8,
    //position: 'relative',  
    
  },
  buttonStyle2: {
    //margin: 2,
    position: 'relative',    
    top:730,
    width: 260,
    height: 55
  },
  buttonStyle3: {
    //margin: 2,
    position: 'relative',    
    //bottom: -700,
    top: 5,
    width: 310,
    height: 55,
    fontSize: 20
  },
  buttonStyle4: {
    //margin: 2,
    position: 'relative',    
    //bottom: -700,
    top: 720,
    //width: 310,
    height: 55
  },
  dividerStyle: {
    margin:0,
    width: 1030
  },
  fontSize16: {
    fontSize: 16
  },
  fontSize22: {
    fontSize: 22,
    margin:0
  },
  tableWidth: {
    width: 1020,
    
  },  
  checkbox: {    
    marginBottom: 16,
    width: 540,
    maxWidth: 540,
  },
  chip: {
    margin: 4,
    //width: 600
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  
};



const EventMemberPanel = () => (
  

  <div style ={styles.fontSize16}>
    

    
    
    <Paper style={styles.billSummaryStyle} zDepth={2}>

      <div style={{marginLeft: '10', position: 'absolute'}}>

        <div style= {{marginLeft : '850'}}>
          <RaisedButton 
            label="Input Expense" 
            labelStyle={{
                fontWeight: '900',
                fontSize: '16'
            }} 
            primary={true} 
            style={styles.buttonStyle} 
          />
                     
          
        </div>

        <Divider style={styles.dividerStyle} />

        <div style= {{marginLeft : '580'}}>
          <FlatButton 
            label="Not Verified yet" 
            labelStyle={{
              fontWeight: '900',
              fontSize: '16'
            }} 
            secondary={true}             
          />
          <FlatButton 
            label="Verified" 
            labelStyle={{
              fontWeight: '900',
              fontSize: '16'
            }} 
            disabled={true} 
            />
          <FlatButton 
            label="Completed" 
            labelStyle={{
              fontWeight: '900',
              fontSize: '16'
            }} 
            disabled={true} 
          />      
        </div>
        


        <Divider style={styles.dividerStyle} />
      
        <p style={styles.fontSize22} >
          Bill Sum = $63.42
        </p>
          
        <Divider style={styles.dividerStyle} />
        
        <h2>Bill Summary Details</h2>
        <br/>
        
        <Table 
          
          style={styles.tableWidth} 
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Expense</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            <TableRow>          
            
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>$16.99</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>$14.99</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>$13.20</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>$18.24</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

      </div>  

    </Paper>  

    
    <Paper style={styles.memberListStyle} zDepth={2}>
      <div style={{marginLeft: '10', position: 'absolute'}}>
        <h3>Member List</h3>
        <br/>


        <Checkbox
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Xiaohua Shi"
          style={styles.checkbox}
        />
        <Checkbox
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Mengxue Luo"
          style={styles.checkbox}
        />
        <Checkbox
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Dongji Cui"
          style={styles.checkbox}
        />
        <Checkbox
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Yiyang Zhou"
          style={styles.checkbox}
        />
        <Checkbox
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Moon sun Hwang"
          style={styles.checkbox}
        />
        <Checkbox
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Sayali Kate"
          style={styles.checkbox}
        />
        <Checkbox
          checkedIcon={<ActionFavorite />}
          uncheckedIcon={<ActionFavoriteBorder />}
          label="Justin Doe"
          style={styles.checkbox}
        /> 

        <RaisedButton label="Add" labelStyle={{
            fontWeight: '900',
            fontSize: '16'
          }} style={styles.buttonStyle2} backgroundColor={amberA400} />
        <RaisedButton label="Remove" labelStyle={{
            fontWeight: '900',
            fontSize: '16'
          }} style={styles.buttonStyle2} backgroundColor={amberA400} />


      </div>  
    </Paper>


    <Paper style={styles.eventListStyle} zDepth={2}> 
      <div style={{marginLeft: '10', position: 'absolute'}}>
        <RaisedButton 
          label="ongoing" 
          labelStyle={{
            fontWeight: '900',
            fontSize: '16'
          }}
          style={styles.buttonStyle3} 
          backgroundColor={teal100}
        /> 
        <RaisedButton 
          label="finished" 
          labelStyle={{
            fontWeight: '900',
            fontSize: '16'
          }}
          style={styles.buttonStyle3} 
          backgroundColor={indigo100} 
          />
        <br/>
        <br/>

        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar color="#444" icon={<SvgIconFace />} />
          This is the name of the event 1
        </Chip>
        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar color="#444" icon={<SvgIconFace />} />
          This is the name of the event 2
        </Chip>
        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar color="#444" icon={<SvgIconFace />} />
          This is the name of the event 3
        </Chip>
        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar color="#444" icon={<SvgIconFace />} />
          This is the name of the event 4
        </Chip>
        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar color="#444" icon={<SvgIconFace />} />
          This is the name of the event 5
        </Chip>
        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar color="#444" icon={<SvgIconFace />} />
          This is the name of the event 6
        </Chip>
        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar color="#444" icon={<SvgIconFace />} />
          This is the name of the event 7
        </Chip>
        <Chip
          onRequestDelete={handleRequestDelete}
          onTouchTap={handleTouchTap}
          style={styles.chip}
        >
          <Avatar color="#444" icon={<SvgIconFace />} />
          This is the name of the event 8
        </Chip>

        <RaisedButton label="Create Button" labelStyle={{
            fontWeight: '900',
            fontSize: '16'
          }} style={styles.buttonStyle4} backgroundColor={red200} fullWidth={true} />


      </div>
    </Paper>
    


  </div>
    

   
);



export default EventMemberPanel;