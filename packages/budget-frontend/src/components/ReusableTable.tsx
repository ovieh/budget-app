/* eslint-disable indent */
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useTable, usePagination } from 'react-table';
import { TableFooter, TablePagination } from '@material-ui/core';

interface Props {
    columns: any;
    data: any;
}

export const ReusuableTable: React.FC<Props> = ({ columns, data }) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        // state: { pageIndex, pageSize },
        gotoPage,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 5 },
        },
        usePagination
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        gotoPage(newPage);
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <TableCell {...column.getHeaderProps()} align='left'>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {page.map((row, i: number) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <TableCell
                                        key={cell.column.id}
                                        align='left'
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};
