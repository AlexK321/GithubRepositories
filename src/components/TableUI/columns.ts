import { makeStyles } from '@material-ui/core/styles';
import { IColumn } from '../Repositories/interfaces';

const columns: IColumn[] = [
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

export const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default columns;
