import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
//import Loading from '../Loading/Loading';
import TableUI from '../TableUI/TableUI';
import AuthBlock from '../AuthBlock/AuthBlock';
import GET_ALL_REPOSITORIES from '../../graphql/query/repositories';
import useDebounce from '../../hooks/useDebounse';
import { Data, IInputValue, IQueryVariables, IPaginationData } from './interfaces';
import createData from './createData';

const Repositories: React.FC = () => {
  let initialRows = [] as Data[];
  const [lazyGetRepositories, { data }] = useLazyQuery(GET_ALL_REPOSITORIES);

  const [rows, setRows] = useState([] as Data[]);

  const queryVariables: IQueryVariables = {
    variables: { searchBy: 'is:public', first: 10, after: null, before: null },
  };

  useEffect(() => {
    lazyGetRepositories(queryVariables);
  }, []);

  useEffect(() => {
    initialRows = createData(data?.search);
    setRows(initialRows);
  }, [data]);

  const [inputValue, setInputValue] = useState({} as IInputValue);
  const debouncedValue = useDebounce(inputValue, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ qualifier: e.currentTarget.id, value: e.currentTarget.value });
  };

  useEffect(() => {
    if (inputValue.qualifier)
      if (inputValue.value.length === 0) {
        queryVariables.variables = { searchBy: 'is:public', first: 10, after: null, before: null };
      } else if (inputValue.qualifier === 'owner') {
        queryVariables.variables.searchBy = `user:${inputValue.value}`;
      } else {
        queryVariables.variables.searchBy = `${inputValue.value} in:${inputValue.qualifier}`;
      }

    lazyGetRepositories(queryVariables);
  }, [debouncedValue]);

  const transferPaginationData = (paginationData: IPaginationData) => {
    queryVariables.variables.first = paginationData.rowPerPage || 10;

    if (paginationData.direction === 'prev') {
      queryVariables.variables.before = data?.search.pageInfo.startCursor;
      queryVariables.variables.after = null;
    }

    if (paginationData.direction === 'next') {
      queryVariables.variables.before = null;
      queryVariables.variables.after = data?.search.pageInfo.endCursor;
    }

    if (paginationData.direction || paginationData.rowPerPage) lazyGetRepositories(queryVariables);
  };

  console.log(queryVariables.variables);

  //if (loading) return <Loading />;

  return (
    <div>
      <AuthBlock />
      <TableUI
        rows={rows}
        transferPaginationData={transferPaginationData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Repositories;
