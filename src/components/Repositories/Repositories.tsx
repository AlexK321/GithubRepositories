import React from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';
import GET_ALL_REPOSITORIES from '../../graphql/query/repositories';

interface Column {
  id: 'name' | 'owner' | 'description' | 'lang' | 'startCount';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'owner', label: 'Owner', minWidth: 150 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 150,
  },
  {
    id: 'lang',
    label: 'Lang',
    minWidth: 150,
    align: 'right',
  },
  {
    id: 'startCount',
    label: 'Start Count',
    minWidth: 150,
    align: 'right',
  },
];

interface Data {
  name: string;
  owner: string;
  description: string;
  lang: string;
  startCount: number;
}

interface IRepositoryData {
  description: string;
  name: string;
  stargazerCount: number;
  isPrivate: boolean;
  owner: {
    login: string;
  };
  languages: {
    nodes: [
      {
        name: string;
      }
    ];
  };
}

interface IRepositoriesData {
  nodes: [IRepositoryData];
}

function createData(repData: IRepositoriesData): Data[] {
  const newData = repData?.nodes.map((item) => {
    return {
      name: item?.name,
      owner: item?.owner?.login,
      description: item?.description || '',
      lang: item?.languages?.nodes[0]?.name || '',
      startCount: item?.stargazerCount,
    };
  });

  return newData;
  //return { name, code, population, size, density };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const Repositories: React.FC = () => {
  let data: any = {};// eslint-disable-line

  data = useQuery(GET_ALL_REPOSITORIES);

  // useEffect(() => {
  //   data = useQuery(GET_ALL_REPOSITORIES);
  // }, []);

  const repositoriesData: IRepositoriesData = data?.data?.user?.repositories;

  const rows = createData(repositoriesData);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    history.push(`/repository/${e.currentTarget.name}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Repositories;
