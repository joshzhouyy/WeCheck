import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../actions/authActions';
import Topbar from './Topbar';
import * as authSelectors from '../reducers/auth_reducer';



// const mapStateToProps = (state) => ({
//   activePanel: appSelectors.getActivePanel(state)
// });

const mapDispatchToProps = (dispatch) => ({
  onClick: bindActionCreators(signOut, dispatch)
});

const mapStateToProps = (state) => ({
    userAccount: authSelectors.getUserAccount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)