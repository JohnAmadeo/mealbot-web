import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

const AUTH_STATE = {
  AUTHENTICATED: 'AUTHENTICATED',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  ERROR: 'ERROR',
};

class Callback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authState: this.props.auth.isAuthenticated() ?
        AUTH_STATE.AUTHENTICATED : 
        AUTH_STATE.UNAUTHENTICATED,
    };
  }

  componentDidMount() {
    const tokensRegex = /access_token|id_token|error/;
    if (tokensRegex.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication()
        .then(result => this.setState({
          authState: AUTH_STATE.AUTHENTICATED,
        }))
        .catch(err => this.setState({
          authState: AUTH_STATE.ERROR,
        }));
    }
  }

  render() {
    switch (this.state.authState) {
      case AUTH_STATE.UNAUTHENTICATED:
        return <Loading>Loading...</Loading>;
      case AUTH_STATE.AUTHENTICATED:
        return <Redirect to='/' />;
      case AUTH_STATE.ERROR:
        return (
          <>
            <div>There has been an authentication error with the server.</div>
            <Link to='/'>Return to Landing Page</Link>
          </>
        );
      default:
        return <>Loading...</>;
    }
  }
}

Callback.propTypes = {
  auth: PropTypes.object.isRequired,
};

const Loading = styled.p`
  text-align: center;
`;

export default Callback;
