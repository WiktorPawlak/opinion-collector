import { get, post } from './api';

export async function apiGetAllSuggestions() {
  return get('/suggestions');
}

export async function apiGetSuggestion({suggestionId}) {
  return await get(`/suggestions/${suggestionId}`);
}

export async function apiAcceptSuggestion({suggestionId}) {
  return await post(`/suggestions/${suggestionId}/accept`)
}

export async function apiRejectSuggestion({suggestionId}) {
  return await post(`/suggestions/${suggestionId}/reject`)
}


