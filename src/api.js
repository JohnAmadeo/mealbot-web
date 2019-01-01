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
  const baseUrl = 'http://localhost:8080/';
  return `${baseUrl}${route}`
}

// fake axios
export const faxios = {
  get: resp => new Promise(res => res(resp)),
  post: resp => new Promise(res => res(resp)),
  delete: resp => new Promise(res => res(resp)),
}