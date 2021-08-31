import React, { useEffect, useState } from 'react';
//import Loading from '../Loading/Loading';
import TableUI from '../TableUI/TableUI';
import AuthBlock from '../AuthBlock/AuthBlock';
import useDebounce from '../../hooks/useDebounse';
import CubeLoader from '../CubeLoader/CubeLoader';
import { Data, IInputValue, IQueryVariables } from './interfaces';
import createData from './createData';
import { useGetAllRepositoriesLazyQuery } from '../../generated/graphql';

const Repositories: React.FC = () => {
  const [lazyGetRepositories, { data, loading }] = useGetAllRepositoriesLazyQuery();

  const [rows, setRows] = useState([] as Data[]);

  const [queryVariables, setQueryVariables] = useState<IQueryVariables>({
    variables: { searchBy: 'is:public', first: 10, after: null, before: null },
  });

  const [page, setPage] = useState(0);

  useEffect(() => {
    //console.log('dm');
    lazyGetRepositories(queryVariables);
  }, [queryVariables]);

  useEffect(() => {
    //console.log('duData');
    setRows(createData(data));
  }, [data]);

  const numbersPages = Number(
    (data.search.repositoryCount / queryVariables.variables.first).toFixed(0)
  );

  const [inputValue, setInputValue] = useState({} as IInputValue);
  const debouncedValue = useDebounce(inputValue, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ qualifier: e.currentTarget.id, value: e.currentTarget.value });
  };

  useEffect(() => {
    //console.log('duInput');

    if (inputValue.qualifier)
      if (inputValue.value.length === 0) {
        setQueryVariables({ variables: { ...queryVariables.variables, searchBy: 'is:public' } });
      } else if (inputValue.qualifier === 'owner') {
        setQueryVariables({
          variables: { ...queryVariables.variables, searchBy: `user:${inputValue.value}` },
        });
      } else {
        setQueryVariables({
          variables: {
            ...queryVariables.variables,
            searchBy: `${inputValue.value} in:${inputValue.qualifier}`,
          },
        });
      }
  }, [debouncedValue]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setQueryVariables({
      variables: {
        ...queryVariables.variables,
        first: Number(event.target.value),
        before: null,
        after: null,
      },
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (newPage > page)
      setQueryVariables({
        variables: {
          ...queryVariables.variables,
          before: null,
          after: data?.search.pageInfo.endCursor,
        },
      });

    if (newPage < page)
      setQueryVariables({
        variables: {
          ...queryVariables.variables,
          before: data?.search.pageInfo.endCursor,
          after: null,
        },
      });

    setPage(newPage);
  };

  console.log('render');

  if (loading) return <CubeLoader />;

  return (
    <div>
      <AuthBlock />
      <TableUI
        rows={rows}
        page={page}
        handleChange={handleChange}
        numbersPages={numbersPages}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={queryVariables.variables.first}
      />
    </div>
  );
};

export default Repositories;
