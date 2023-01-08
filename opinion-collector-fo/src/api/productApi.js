import { get, postMultipart } from './api';

export function getProducts() {
  return get('/products');
}

export function getProductOrigins(body) {
  return get('/products/origins');
}

export async function postProduct(body) {
  return postMultipart('/products', body, true);
}
