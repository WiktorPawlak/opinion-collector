import { get, post } from './api';

export function postLogin(body) {
  return post('/login', body);
}

export function apiGetSelf() {
  return get('/clients/self');
}

export function apiGetClients() {
  return get('/clients');
}
