import { get, post, put, putWithBody, remove } from './api';

export function apiGetCategories() {
  return get('/categories');
}

export function getCategory(id) {
  return get(`/categories/${id}`);
}

export function postCategory(body) {
  return post('/categories', body);
}

export function putCategory(body) {
  return putWithBody('/categories', body);
}

export function deleteCategory(id) {
  return remove(`/categories/${id}`)
}
