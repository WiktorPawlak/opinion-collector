import { get, post, put } from './api';

export function apiGetCategories() {
  return get('/categories');
}

export function postCategory(body) {
  return post('/categories', body);
}

export function putCategory() {
  return put('/categories');
}

export function deleteCategory(id) {
  return delete(`/categories/${id}`)
}
