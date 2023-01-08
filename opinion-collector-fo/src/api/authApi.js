import { get, post, put } from './api';

export function postLogin(body) {
  return post('/login', body);
}

export function postRegister(body) {
  return post('/register', body);
}

export function apiGetSelf() {
  return get('/clients/self');
}

export function apiGetClients() {
  return get('/clients');
}

export function apiChangePassword(params) {
  return put('/clients/self/change-password', params);
}

export async function apiChangeEmail(params) {
  return await put('/clients/self/change-email', params);
}
