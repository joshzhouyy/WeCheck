import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authSelectors from '../reducers/auth_reducer';

import CreateEventPanel from './CreateEventPanel';

const mapStateToProps = (state) => ({
  userId: authSelectors.getUserId(state),
});

export default connect(mapStateToProps)(CreateEventPanel);
