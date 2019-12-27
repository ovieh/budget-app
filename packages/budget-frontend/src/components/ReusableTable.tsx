import React from 'react';
import styled from '@emotion/styled/macro';
import { useTable } from 'react-table';

interface Props {
    columns: any;
    data: transaction[];
}

type column = { Header: string; accessor: any };

type transaction = {
    transactionDate: string;
    transactionDescription: string;
    debitAmount: number;
    creditAmount: number;
    balance: number;
};

const Table = styled.table`
    /* border: 1px solid black; */
    margin-top: 5px;
    border-collapse: collapse;

    td,
    th {
        border-bottom: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        min-width: 5rem;
    }
    tr:hover {
        background-color: gainsboro;
    }
`;

export const ReusuableTable: React.FC<Props> = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    return (
        <Table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
