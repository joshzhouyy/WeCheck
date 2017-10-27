import { connect } from 'react-redux';

import * as appSelectors from '../app/appReducer';
import * as authSelectors from '../reducers/auth_reducer';

import EventMemberPanel from './EventMemberPanel';

const mapStateToProps = (state) => ({
  userId: authSelectors.getUserId(state)
});

const EventPanelContainer = connect(
  mapStateToProps
)(EventMemberPanel);

export default EventPanelContainer;