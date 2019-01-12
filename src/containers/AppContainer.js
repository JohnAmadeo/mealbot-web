import React from 'react';
import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = state => ({
  orgs: state.orgs.orgs,
});

const mapDispatchToProps = {};

let AppContainer = props => <App {...props} />;

AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);

export default AppContainer;