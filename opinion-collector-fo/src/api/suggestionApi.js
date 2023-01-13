import { get, post } from './api';

export async function apiGetAllSuggestions() {
  return get('/suggestions');
}

export async function apiGetSuggestion({suggestionId}) {
  return get(`/suggestions/${suggestionId}`);
}

export async function apiAcceptSuggestion({suggestionId}) {
  return post(`/suggestions/${suggestionId}/accept`)
}

export async function apiRejectSuggestion({suggestionId}) {
  return post(`/suggestions/${suggestionId}/reject`)
}


