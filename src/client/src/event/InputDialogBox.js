import React from 'react';
import autoBind from 'react-autobind';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {styles} from './CreateEventPanelStyle';

const DialogBtn = (type, label, handleOpen, backgroundColor, style) => {
  switch(type) {
    case "primary":
      return (
        <RaisedButton label={label} primary={true} onClick={handleOpen} />
        );
    case "secondary":
      return (
        <RaisedButton label={label} secondary={true} onClick={handleOpen} />
        );
    default:
      return (
        <RaisedButton 
          label={label} 
          backgroundColor={backgroundColor} 
          style={style}
          onClick={handleOpen} />
        );
  }
}


class InputDialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      input: ""
    }
    autoBind(this);
  }

  onChange = (event, input) => {
    // console.log(input);
    this.setState({
      input: input
    });
  };

  handleOpen = () => {
    this.setState({open: true})
  };

  handleCancel = () => {
    this.setState({open: false})
  };

  handleSubmit = (props) => {
    const onClickType = props.onClickType;
    const onClick = props.onClick;
    const dispatchFunc = props.dispatchFunc;
    const eventId = props.eventId;
    const userId = props.userId;
    const successMsg = props.successMsg;
    const failMsg = props.failMsg;

    const userInput = this.state.input;
    if (userInput.length === 0) {
      alert("Please input something!");
    }
    else {
      // console.log(this.state.input);
      onClick(eventId, userId, userInput)
      .then(value => {
        console.log("success");
        switch(onClickType) {
          case "addTotal":
            const event = {
              eventName: value.eventName,
              eventTotal: value.totalAmount
            }
            dispatchFunc(event); 
          default:
            return;
        }
        alert(successMsg);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        const status = err.response.status;
        const statusText = err.response.statusText;
        const data = err.response.data;
        alert(failMsg + "\n" + status + " " + statusText + "\n" + data);
      });

      this.setState({open: false});
      }
  }

  render () {
    // console.log(this.props);
    const type = this.props.type;
    const onClickType = this.props.onClickType;
    const label = this.props.label;
    const title = this.props.title;
    const onClick = this.props.onClick;
    const dispatchFunc = this.props.dispatchFunc;
    const eventId = this.props.eventId;
    const userId = this.props.userId;
    const backgroundColor = this.props.backgroundColor;
    const style = this.props.style;
    const id = this.props.id;
    const successMsg = this.props.successMsg;
    const failMsg = this.props.failMsg;

    const handleSubmitProps = {
      onClickType: onClickType,
      onClick: onClick,
      dispatchFunc: dispatchFunc,
      eventId: eventId,
      userId: userId,
      successMsg: successMsg,
      failMsg: failMsg
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleSubmit(handleSubmitProps)}
      />
    ];

    return (
      <div className="eventPanelBtns">
        {DialogBtn(type, label, this.handleOpen, backgroundColor, style)}
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <TextField id={id} 
          underlineStyle={styles.underlineStyle}
          onChange={(event, input) => this.onChange(event, input)}/>
        </Dialog>
      </div>
    );
  }

}

export default InputDialogBox
