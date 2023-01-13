import { useCallback, useEffect, useState } from 'react';
import {
  apiGetAllSuggestions
} from '../api/suggestionApi';

export function useSuggestion() {
  const [suggestions, setSuggestions] = useState([]);


  const getSuggestions = useCallback(async () => {
    const response = await apiGetAllSuggestions();

    if (response[1] === 200) {
      const mapedClient = response[0].map((suggestion) => ({
        username: suggestion.client.username,
        title: suggestion.product.title,
        suggestionState: suggestion.suggestionState
      }));
      setSuggestions(mapedClient);
    }
  }, []);



  useEffect(() => {
    getSuggestions();
  }, [getSuggestions]);


  return {
    suggestions
  };
}
