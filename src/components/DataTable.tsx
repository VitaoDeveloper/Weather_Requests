import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import type { TableRows } from '../types/TableRows';

export function DataTable({ rows }: TableRows) {
  return (
    <TableContainer className="data-table-container">
      <Table className="data-table" size="small" aria-label="weather data">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} className="data-table-row">
              <TableCell className="data-table-cell" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className="data-table-cell-value" align="right">
                {row.data}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
