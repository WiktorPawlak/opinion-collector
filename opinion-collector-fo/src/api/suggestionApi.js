import { get, post, remove } from './api';

export async function apiGetAllSuggestions() {
  return get('/suggestions');
}

export async function apiGetSuggestion({suggestionId}) {
  return await get(`/suggestions/${suggestionId}`);
}

export async function apiGetMySuggestion(username) {
  return await get(`/suggestions/search?username=${username}`);
}

export async function apiAcceptSuggestion({suggestionId}) {
  return await post(`/suggestions/${suggestionId}/accept`)
}

export async function apiRejectSuggestion({suggestionId}) {
  return await post(`/suggestions/${suggestionId}/reject`)
}

export async function apiDeleteSuggestion({suggestionId}) {
  return await remove(`/suggestions/${suggestionId}`)
}


