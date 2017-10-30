import { connect } from 'react-redux';

import * as appSelectors from '../app/appReducer';
import App from './App';

const mapStateToProps = (state) => ({
  activePage: appSelectors.getActivePage(state)
});

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;