import { get } from './api';

export async function apiGetAllSuggestions() {
  return get('/suggestions');
}
