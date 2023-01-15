import { get, postMultipart, put, putWithBody, putMultipart } from './api';

export function getProductsVisivle() {
  return get('/products/visible');
}

export function getProducts() {
  return get('/products');
}

export function getProductById(id) {
  return get(`/products/${id}`);
}

export function getWholeProductById(id) {
  return get(`/products/whole/${id}`);
}

export function getProductOrigins(body) {
  return get('/products/origins');
}

export async function postProduct(body) {
  return postMultipart('/products', body, true);
}

export async function putProduct(body) {
  return await putMultipart('/products', body, true);
}

export async function getProductOpinions(id) {
  return get(`/products/opinions/${id}`);
}

export async function getVisibleOpinionsForProductId(id) {
  return get(`/products/opinions/visible/${id}`);
}

export function putProductHidden(id) {
  return put(`/products/hide/${id}`);
}
