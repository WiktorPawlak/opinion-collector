import { Box } from '@mui/system';
import { SuggestionTable } from './SuggestionTable';
import {
  TextField
} from '@mui/material';
import { useState } from 'react';
import { useMySuggestion } from '../../hooks/useSuggestion';
import { useClient } from '../../hooks/useUser';
import { PageLoad } from '../../pages/PageLoad';

export function MySuggestions() {
  const [fliter, setFilter] = useState('');
  const { client } = useClient();
  const {mySuggestions} = useMySuggestion( client?.username?.username);


  if (mySuggestions === null) {
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
        (console.log(getClientName()));
        <TextField
          sx={{ width: '40%', margin: '10px' }}
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
        />
      </Box>

      <SuggestionTable
        suggestions={mySuggestions.filter(
          (suggestions) =>
            suggestions.username.includes(fliter) || suggestions.title.includes(fliter)
        )}
      />
    </Box>
  );
}
