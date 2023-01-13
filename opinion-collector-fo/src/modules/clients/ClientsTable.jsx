import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { ClientActions } from './ClientActions';
import { useState } from 'react';

const columns = [
  { id: 'username', label: 'Username', minWidth: 200 },
  { id: 'email', label: 'Email', minWidth: 250 },
  { id: 'role', label: 'Role', minWidth: 30 },
  { id: 'actions', label: '', align: 'right' }
];

export function ClientsTable({ clients, showActive }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper
      sx={{
        width: '80%',
        overflow: 'hidden'
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clients &&
              clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'actions' ? (
                            <ClientActions
                              username={row.username}
                              showActive={showActive}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPage}
        component="div"
        count={clients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}
