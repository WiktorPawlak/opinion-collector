import { get, post } from './api';

export function getProducts() {
  return get('/products');
}

export function getProductOrigins(body) {
  return get('/products/origins');
}

export function postProduct(body) {
  return post('/products', body);
}
