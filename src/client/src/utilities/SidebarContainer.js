import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {selectActivePage} from '../app/AppActions';
import * as appSelectors from '../app/appReducer';
import Sidebar from './Sidebar';

const mapStateToProps = (state) => ({
  activePage: appSelectors.getActivePage(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClick: bindActionCreators(selectActivePage, dispatch)
});

const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export default SidebarContainer