import { Box } from '@mui/system';
import { ClientsTable } from './ClientsTable';
import {
  FormControl,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { useClient } from '../../hooks/useUser';
import { PageLoad } from '../../pages/PageLoad';

export function ClientsPanel() {
  const [fliter, setFilter] = useState('');
  const [showActive, setShowActive] = useState(true);

  const { activeClients, archivedClients } = useClient();

  function getClients() {
    return showActive ? activeClients : archivedClients;
  }

  if (activeClients.length === 0) {
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={showActive}
            onChange={(e) => setShowActive(e.target.value)}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Archived</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ClientsTable
        clients={getClients().filter(
          (client) =>
            client.username.includes(fliter) || client.email.includes(fliter)
        )}
        showActive={showActive}
      />
    </Box>
  );
}
