import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signOut } from '../actions/authActions';
import Topbar from './Topbar';

// const mapStateToProps = (state) => ({
//   activePanel: appSelectors.getActivePanel(state)
// });

const mapDispatchToProps = (dispatch) => ({
  onClick: bindActionCreators(signOut, dispatch)
});

export default connect(mapDispatchToProps)(Topbar)