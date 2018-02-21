import Auth0Lock from 'auth0-lock';
import jwtDecode from 'jwt-decode';

import config from './config';

export const lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN, {
  auth: {
    redirectUrl: config.REDIRECT_URL,
    responseType: 'token'
  },
  theme: {
    logo:
      'http://www.freeiconspng.com/uploads/fitness-fitness-room-gym-gymnastic-health-healthcare-healthy--13.png',
    primaryColor: '#00BCD4'
  },
  languageDictionary: {
    title: 'IV - UGR'
  },
  avatar: null
  ,autoclose: true
});

export const login = () => {
  lock.show();
};

export const loggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

export const logout = () => {
  window.localStorage.removeItem('id_token');
  window.localStorage.removeItem('profile');
};

export const getProfile = () => {
  const profile = window.localStorage.getItem('profile');
  return profile ? JSON.parse(window.localStorage.profile) : {};
};

export const setProfile = profile => {
  window.localStorage.setItem('profile', JSON.stringify(profile));
};

export const setToken = idToken => {
  window.localStorage.setItem('id_token', idToken);
};

export const getToken = () => {
  return window.localStorage.getItem('id_token');
};

export const getTokenExpirationDate = () => {
  const token = getToken();
  const decoded = jwtDecode(token);
  if (!decoded.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
};

export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;
  const date = getTokenExpirationDate();
  const offsetSeconds = 0;
  if (date === null) {
    return false;
  }
  return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
};
