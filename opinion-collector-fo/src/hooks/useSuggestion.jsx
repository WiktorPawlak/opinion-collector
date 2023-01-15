import { useCallback, useEffect, useState } from 'react';
import {
  apiGetAllSuggestions,
  apiAcceptSuggestion,
  apiRejectSuggestion,
  apiGetMySuggestion,
  apiEditSuggestion
} from '../api/suggestionApi';

export function useSuggestion() {
  const [suggestions, setSuggestions] = useState(null);

  const getSuggestions = useCallback(async () => {
    const response = await apiGetAllSuggestions();

    if (response[1] === 200) {
      const mappedClient = response[0].map((suggestion) => ({
        ...suggestion,
        username: suggestion.client.username,
        title: suggestion.product.title,
        client: undefined,
      }));
      setSuggestions(mappedClient);
    }
  }, []);

  useEffect(() => {
    getSuggestions();
  }, [getSuggestions]);

  return {
    suggestions
  };
}

export function useMySuggestion(username) {
  const [mySuggestions, setMySuggestions] = useState(null);


  const getMySuggestions = useCallback(async () => {
    if (!username) return;
    const response = await apiGetMySuggestion(username);


    if (response[1] === 200) {
      const mappedClient = response[0].map((suggestion) => ({
        ...suggestion,
        username: suggestion.client.username,
        title: suggestion.product.title,
        client: undefined,
      }));
      setMySuggestions(mappedClient);
    }
  }, [username]);

  useEffect(() => {
    getMySuggestions();
  }, [getMySuggestions, username]);

  return {
    mySuggestions
  };
}

export function useHandleSuggestion() {
  const acceptSuggestion = useCallback(async (suggestionId) => {
    const response = await apiAcceptSuggestion({ suggestionId: suggestionId });
    return response[1] === 200;
  }, []);

  const rejectSuggestion = useCallback(async (suggestionId) => {
    const response = await apiRejectSuggestion({ suggestionId: suggestionId });

    return response[1] === 200;
  }, []);

  return {
    acceptSuggestion,
    rejectSuggestion
  };
}

export function useEditSuggestion() {
  const editSuggestion = useCallback(async (suggestionId, body) => {
    const response = await apiEditSuggestion({suggestionId: suggestionId}, body);
    return response[1] === 200;
  }, [])

  return editSuggestion;
}
