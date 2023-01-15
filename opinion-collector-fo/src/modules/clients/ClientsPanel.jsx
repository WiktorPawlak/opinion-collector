import { Box } from '@mui/system';
import { ClientsTable } from './ClientsTable';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useClient } from '../../hooks/useUser';
import { PageLoad } from '../../pages/PageLoad';
import { useCallback } from 'react';
import { useEffect } from 'react';

export function ClientsPanel() {
  const [fliter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [showActive, setShowActive] = useState(true);

  const { getActiveClients, getArchivedClients } = useClient();

  const findClients = useCallback(async () => {
    setLoading(true);
    let response;

    if (showActive) {
      response = await getActiveClients();
    } else {
      response = await getArchivedClients();
    }
    setClients(response);
    setLoading(false);
  }, [getActiveClients, getArchivedClients, showActive]);

  useEffect(() => {
    findClients();
  }, [findClients]);

  if (loading) {
    return <PageLoad />;
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
        clients={clients.filter(
          (client) =>
            client.username.includes(fliter) || client.email.includes(fliter)
        )}
        showActive={showActive}
      />
    </Box>
  );
}
