import { connect } from 'react-redux';

import * as authSelectors from '../reducers/auth_reducer';
import MessageBox from './MessageBox';

const mapStateToProps = (state) => ({
  userId: authSelectors.getUserId(state)
});

const MessageBoxContainer = connect(mapStateToProps)(MessageBox);

export default MessageBoxContainer;
