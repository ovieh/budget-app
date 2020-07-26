/* eslint-disable indent */
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect } from 'react';
import { useTable, usePagination, Row, Column } from 'react-table';
import { TableFooter, TablePagination } from '@material-ui/core';
import { TransactionsByMonthAndYearQuery } from '../generated/graphql';

interface Props {
    columns: any;
    data: any;
    pageCount: number;
    count: number;

    onLoadMore: Function;
}

export const ReusuableTable: React.FC<Props> = ({
    columns,
    data,
    onLoadMore,
    pageCount: controlledPageCount,
    count = 0,
}) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canNextPage,
        canPreviousPage,
        nextPage,
        previousPage,
        state: { pageIndex, pageSize },
        setPageSize,
        gotoPage,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        usePagination
    );

    useEffect(() => {
        onLoadMore({ pageIndex, pageSize });
    }, [pageIndex, onLoadMore, pageSize]);


    const handleChangePage = (event: unknown, newPage: number) => {
        nextPage();
        gotoPage(pageIndex + 1);
        setCurrentPage(pageIndex + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    return (
        <>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            count,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
            <TableContainer component={Paper}>
                <Table {...getTableProps()} size='small'>
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
                                count={count}
                                rowsPerPage={rowsPerPage}
                                page={currentPage}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};
