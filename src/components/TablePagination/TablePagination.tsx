import { MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { IPaginationData } from '../Repositories/interfaces';

interface ITablePagination {
  transferPaginationData: (arg0: IPaginationData) => void;
}

const TablePagination: React.FC<ITablePagination> = ({ transferPaginationData }) => {
  const [amountRows, setAmountRows] = React.useState('10');

  const [paginationData, setPaginationData] = useState({ rowPerPage: 10 } as IPaginationData);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmountRows(event.target.value as string);
    setPaginationData({ ...paginationData, rowPerPage: Number(event.target.value) });
  };

  const onPrevClick = () => {
    setPaginationData({ ...paginationData, direction: 'prev' });
    paginationData.direction = 'prev';
  };

  const onNextClick = () => {
    setPaginationData({ ...paginationData, direction: 'next' });
  };

  useEffect(() => {
    transferPaginationData(paginationData);
  }, [paginationData]);

  return (
    <div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={amountRows}
        onChange={handleChange}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
      {/* <p>TotalPages {totalPages}</p> */}
      <button type="button" onClick={onPrevClick}>
        Prev
      </button>
      <button type="button" onClick={onNextClick}>
        Next
      </button>
      {/* <p>Page {page}</p> */}
    </div>
  );
};

export default TablePagination;
