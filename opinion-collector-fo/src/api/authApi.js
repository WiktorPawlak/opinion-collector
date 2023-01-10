import { get, post, postNoResponse, put } from './api';

export async function postLogin(body) {
  return post('/login', body);
}

export async function postRegister(body) {
  return postNoResponse('/register', body);
}

export async function apiGetSelf() {
  return get('/clients/self');
}

export async function apiGetActiveClients() {
  return get('/clients/active-clients');
}

export async function apiGetArchivedClients() {
  return get('/clients/archived-clients');
}

export async function apiArchiveSelf() {
  return put('/clients/self/profile-deletion');
}

export async function apiArchiveClient(params) {
  return put('/clients/self/profile-deletion', params);
}

export async function apiChangeRole(params) {
  return put('/clients/change-role', params);
}

export async function apiChangePassword(params) {
  return put('/clients/self/change-password', params);
}

export async function apiChangeEmail(params) {
  return await put('/clients/self/change-email', params);
}
