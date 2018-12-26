import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Landing extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.props.auth.renewSession();
    }
  }

  render() {
    return (
      <>
        {!this.props.auth.isAuthenticated() ? (
          <>
            <button
              onClick={this.props.auth.login}
              >
              Log In
            </button>
            <span>Landing page</span>
          </>) : (
          <Redirect to='/members'/>
        )}
      </>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Landing;
