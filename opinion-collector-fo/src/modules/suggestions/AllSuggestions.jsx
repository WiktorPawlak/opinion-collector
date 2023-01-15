import { Box } from '@mui/system';
import { SuggestionTable } from './SuggestionTable';
import {
  FormControl,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { useSuggestion } from '../../hooks/useSuggestion';
import { PageLoad } from '../../pages/PageLoad';

export function AllSuggestions() {
  const [fliter, setFilter] = useState('');
  const { suggestions } = useSuggestion();
  const [showByState, setShowByState] = useState('ALL');


  if (suggestions === null) {
    return (<PageLoad />)
  }

  function getSuggestions() {
    // console.log(showByState !== 'ALL' ? suggestions.filter((suggestion) => suggestion.suggestionState === showByState) : suggestions);
    return showByState !== 'ALL' ? suggestions.filter((suggestion) => suggestion.suggestionState === showByState) : suggestions;
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={showByState}
            onChange={(e) => setShowByState(e.target.value)}
          >
            <MenuItem value={'ALL'}>ALL</MenuItem>
            <MenuItem value={'SUBMITTED'}>SUBMITTED</MenuItem>
            <MenuItem value={'REJECTED'}>REJECTED</MenuItem>
          </Select>
        </FormControl>
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
