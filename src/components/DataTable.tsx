import { makeStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import type { TableRows } from '../types/TableRows';

const useStyles = makeStyles(() => createStyles({
  container: {
    border: '1px solid var(--border)',
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
    width: '100%',
    maxWidth: 500,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'var(--bg)',
  },
  row: {
    transition: 'background 0.2s',
    '&:hover': {
      background: 'var(--accent-bg)',
    },
  },
  rowLast: {
    '& $cell, & $cellValue': {
      borderBottom: 'none',
    },
  },
  cell: {
    fontFamily: 'var(--sans)',
    fontSize: 16,
    color: 'var(--text-h)',
    fontWeight: 500,
    padding: '14px 20px',
    borderBottom: '1px solid var(--border)',
    textAlign: 'left',
  },
  cellValue: {
    fontFamily: 'var(--mono)',
    fontSize: 16,
    color: 'var(--accent)',
    padding: '14px 20px',
    borderBottom: '1px solid var(--border)',
    textAlign: 'right',

    '@media (max-width: 1024px)': {
      fontSize: 15,
    },
  },
}));

export function DataTable({ rows }: TableRows) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} size="small" aria-label="weather data">
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.name} className={`${classes.row} ${i === rows.length - 1 ? classes.rowLast : ''}`}>
              <TableCell className={classes.cell} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className={classes.cellValue} align="right">
                {row.data}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
