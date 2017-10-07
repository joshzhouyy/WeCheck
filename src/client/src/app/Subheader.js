import React from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'react-bootstrap'


const subHeaderTitle = ({headerName}) => (
  <h3>{headerName}</h3>
);

const subHeader = ({headerName}) => (
  <div>
    <Panel header={subHeaderTitle(headerName)}>
      Panel content
    </Panel>
  </div>
);

subHeader.propTypes = {
	headerName: PropTypes.string.isRequired
}

export default subHeader



