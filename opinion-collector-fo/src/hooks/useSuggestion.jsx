import { useCallback, useEffect, useState } from 'react';
import {
  apiGetAllSuggestions,
  apiAcceptSuggestion,
  apiRejectSuggestion,
  apiGetMySuggestion
} from '../api/suggestionApi';

export function useSuggestion() {
  const [suggestions, setSuggestions] = useState([]);
  const [mySuggestions, setMySuggestions] = useState([]);


  const getSuggestions = useCallback(async () => {
    const response = await apiGetAllSuggestions();

    if (response[1] === 200) {
      const mapedClient = response[0].map((suggestion) => ({
        suggestionId: suggestion.suggestionId,
        username: suggestion.client.username,
        title: suggestion.product.title,
        suggestionState: suggestion.suggestionState
      }));
      setSuggestions(mapedClient);
    }
  }, []);

  const getMySuggestions = useCallback(async (username) => {
    const response = await apiGetMySuggestion({username : username});

    if (response[1] === 200) {
      const mapedClient = response[0].map((suggestion) => ({
        suggestionId: suggestion.suggestionId,
        username: suggestion.client.username,
        title: suggestion.product.title,
        suggestionState: suggestion.suggestionState
      }));
      setMySuggestions(mapedClient);
    }
  }, []);


  const acceptSuggestion = useCallback(async ({suggestionId}) => {
    const response = await apiAcceptSuggestion({ suggestionId : suggestionId});
    return response[1] === 200;
  }, []);

  const rejectSuggestion = useCallback(async ({suggestionId}) => {
    const response = await apiRejectSuggestion({ suggestionId : suggestionId});

    return response[1] === 200;
  }, []);



  useEffect(() => {
    getSuggestions();
  }, [getSuggestions]);

  useEffect(() => {
    getMySuggestions();
  }, [getMySuggestions]);



  return {
    suggestions,
    mySuggestions,
    acceptSuggestion,
    rejectSuggestion
  };
}

