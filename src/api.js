import { REACT_APP_ENV } from './utils';

export function apiConfig(auth) {
  return {
    headers: {
      'Authorization': `Bearer ${auth.getAccessToken()}`,
    },
    params: {
      admin: auth.getEmail(),
    }
  };
}

export function url(route) {
  // const baseUrl = process.env.REACT_APP_ENV === REACT_APP_ENV.PROD ?
  //   'https://mealbot-2.herokuapp.com/' :
  //   'http://localhost:8080/';
  const baseUrl = 'https://mealbot-2.herokuapp.com/';
  return `${baseUrl}${route}`
}

// fake axios
export const faxios = {
  get: resp => new Promise(res => res(resp)),
  post: resp => new Promise(res => res(resp)),
  delete: resp => new Promise(res => res(resp)),
}