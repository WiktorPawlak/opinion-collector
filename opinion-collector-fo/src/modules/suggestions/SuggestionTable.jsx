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
import { SuggestionAction } from './SuggestionAction';
import { useState } from 'react';

const columns = [
  { id: 'username', label: 'Username', minWidth: 200 },
  { id: 'title', label: 'Product name', minWidth: 250 },
  { id: 'suggestionState', label: 'State', minWidth: 30 },
  { id: 'actions', label: '', align: 'right' }
];

export function SuggestionTable({ suggestions }) {
  const [page, setPage] = useState(0)

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
              {suggestions &&
                suggestions
                  .slice(page * 10, page * 10 + 10)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'actions' ? (
                                <SuggestionAction username={row.username} />
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
          rowsPerPageOptions={10}
          component="div"
          count={suggestions.length}
          rowsPerPage={10}
          page={page}
          onPageChange={setPage}
        />
      </Paper>
  );
}
