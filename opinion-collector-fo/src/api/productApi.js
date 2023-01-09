import { get, postMultipart } from './api';

export function getProductsVisivle() {
  return get('/products/visible');
}

export function getProducts() {
  return get('/products');
}

export function getProductById(id) {
  return get(`/products/${id}`);
}

export function getProductOrigins(body) {
  return get('/products/origins');
}

export async function postProduct(body) {
  return postMultipart('/products', body, true);
}
