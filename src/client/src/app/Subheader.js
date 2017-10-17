import React from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'react-bootstrap'


const subHeaderTitle = (headerName) => (
  <h3>{headerName}</h3>
);

const SubHeader = ({headerName}) => (
  <div>
    <Panel header={subHeaderTitle(headerName)}>
      Panel content
    </Panel>
  </div>
);

SubHeader.propTypes = {
	headerName: PropTypes.string.isRequired
}

export default SubHeader



