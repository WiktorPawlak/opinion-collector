import { useCallback, useEffect, useState } from 'react';
import {
  apiGetAllSuggestions,
  apiAcceptSuggestion,
  apiRejectSuggestion
} from '../api/suggestionApi';

export function useSuggestion() {
  const [suggestions, setSuggestions] = useState([]);


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



  return {
    suggestions,
    acceptSuggestion,
    rejectSuggestion
  };
}
