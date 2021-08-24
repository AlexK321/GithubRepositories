import React from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, TextField } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import { Data } from '../Repositories/interfaces';
import columns, { useStyles } from './columns';

interface ITableUI {
  rows: Data[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  numbersPages: number;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  rowsPerPage: number;
  page: number;
}

const TableUI: React.FC<ITableUI> = ({
  rows,
  handleChange,
  numbersPages,
  handleChangeRowsPerPage,
  handleChangePage,
  rowsPerPage,
  page,
}) => {
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //history.push({ pathname: '/repository/', search: `?name=${e.currentTarget.name}` });
    history.push(
      `/repository?name=${e.currentTarget.name}&owner=${e.currentTarget.getAttribute('data-owner')}`
    );
  };

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TextField
                    id={column.id}
                    label={column.label}
                    type="input"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'name' && (
                          <Button
                            color="secondary"
                            name={String(value)}
                            data-owner={row.owner}
                            onClick={handleClick}
                          >
                            {value}
                          </Button>
                        )}
                        {!(column.id === 'name') && value}
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={numbersPages}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableUI;
