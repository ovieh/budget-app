/* eslint-disable indent */
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useTable } from 'react-table';

interface Props {
    columns: any;
    data: any;
    select?: any;
    handleClickOpen?: () => void;
}

type column = { Header: string; accessor: any };

type transaction = {
    date: string;
    description: string;
    debitAmount: number;
    creditAmount: number;
    balance: number;
};

export const ReusuableTable: React.FC<Props> = ({ columns, data, handleClickOpen }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <TableContainer component={Paper}>
            <Table {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps()} align='right'>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return cell.column.id === 'category.name' ? (
                                        <TableCell
                                            key={cell.column.id}
                                            align='right'
                                            onClick={handleClickOpen}
                                            style={{ cursor: 'pointer' }}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ) : (
                                        <TableCell
                                            key={cell.column.id}
                                            align='right'
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
