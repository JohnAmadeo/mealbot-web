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