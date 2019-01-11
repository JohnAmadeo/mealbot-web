import React from 'react';
import { connect } from 'react-redux';

import { removeError } from '../actions/errors';
import ErrorList from '../components/ErrorList';

const mapStateToProps = state => ({
  errors: state.errors,
});

const mapDispatchToProps = {
  removeError,
};

let ErrorListContainer = props => <ErrorList {...props}/>;

ErrorListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorListContainer);

export default ErrorListContainer;