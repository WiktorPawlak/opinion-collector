import { Box } from '@mui/system';
import { SuggestionTable } from './SuggestionTable';
import {
  TextField
} from '@mui/material';
import { useState } from 'react';
import { useSuggestion } from '../../hooks/useSuggestion';
import { PageLoad } from '../../pages/PageLoad';

export function AllSuggestions() {
  const [fliter, setFilter] = useState('');
  const {suggestions} = useSuggestion();

  function getSuggestions() {
    return suggestions;
  }

  if (suggestions.length === 0) {
    return (<PageLoad />)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%'
        }}
      >
        <TextField
          sx={{ width: '40%', margin: '10px' }}
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
        />
      </Box>

      <SuggestionTable
        suggestions={getSuggestions().filter(
          (suggestions) =>
            suggestions.username.includes(fliter) || suggestions.title.includes(fliter)
        )}
      />
    </Box>
  );
}
