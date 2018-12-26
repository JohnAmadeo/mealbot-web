import auth0 from 'auth0-js';
import history from './history';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'mealbot.auth0.com',
      clientID: 'waDxEb9pnY5v5aGPvcAlgT4vhd6tKIda',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid'
    });
    this.accessToken = localStorage.getItem('accessToken');
    this.idToken = localStorage.getItem('idToken');
    this.expiresAt = localStorage.getItem('expiresAt');
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve(authResult);
        } else if (err) {
          history.replace('/');
          reject(err);
        }
      });
    });
  }

  getAccessToken = () => {
    return this.accessToken;
  }

  getIdToken = () => {
    return this.idToken;
  }

  setSession = (authResult) => {
    console.log(authResult);
    
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();

    localStorage.setItem('accessToken', this.accessToken);
    localStorage.setItem('idToken', this.idToken);
    localStorage.setItem('expiresAt', this.expiresAt);

    history.replace('/');
  }

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  }

  login = () => {
    this.auth0.authorize();
  }

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');

    history.replace('/');
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}