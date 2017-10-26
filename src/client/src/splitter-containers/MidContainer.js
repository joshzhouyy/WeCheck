import React from 'react';

import ActivePanelContainer from './ActivePanelContainer';
import "./SplitterContainers.css";

import { connect } from 'react-redux';
import {selectActivePanel} from '../app/AppActions';
import * as appSelectors from '../app/appReducer';


class MidContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  render(){
    const panelName = this.props.activePanel;
    console.log(panelName)
    return (
      <div id="midContainer" className="containers">
        <ActivePanelContainer panelName={panelName} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  activePanel: appSelectors.getActivePanel(state)
});


export default connect(mapStateToProps)(ActivePanelContainer)