import React from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';
import TablePagination from '../TablePagination/TablePagination';
import { Data, IPaginationData } from '../Repositories/interfaces';
import columns, { useStyles } from './columns';

interface ITableUI {
  rows: Data[];
  transferPaginationData: (arg0: IPaginationData) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableUI: React.FC<ITableUI> = ({ rows, transferPaginationData, handleChange }) => {
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    history.push(`/repository/${e.currentTarget.name}`);
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
                  {column.label}
                  <TextField
                    id={column.id}
                    label="Search"
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
                        <button name={String(value)} type="button" onClick={handleClick}>
                          {value}
                        </button>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination transferPaginationData={transferPaginationData} />
    </Paper>
  );
};

export default TableUI;
