import React from 'react';

import ActivePanelContainer from './ActivePanelContainer';
import "./SplitterContainers.css";


class MidContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div id="midContainer" className="containers">
        <ActivePanelContainer />
      </div>
    );
  }
}

export default MidContainer