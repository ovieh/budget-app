import React from 'react';
import { ReusuableTable } from './ReusableTable';
import {
    useTransactionByMonthYearQuery,
    GetYearMonthQuery,
} from '../generated/graphql';

interface Props {
    yearMonth: GetYearMonthQuery;
    active: number;
}

export const TransactionsTable: React.FC<Props> = ({ yearMonth, active }) => {
    const { data, error, loading } = useTransactionByMonthYearQuery({
        // skip: !date,
        variables: {
            month: yearMonth.getYearMonth[active].month,
            year: yearMonth.getYearMonth[active].year,
        },
    });

    const TransactionsColumns = [
        { Header: 'Date', accessor: 'date' },
        { Header: 'Description', accessor: 'description' },
        { Header: 'Debit Amount', accessor: 'debitAmount' },
        { Header: 'Credit Amount', accessor: 'creditAmount' },
        { Header: 'Balance', accessor: 'balance' },
        { Header: 'Category', accessor: 'category.name' },
    ];

    if (error) {
        return <div>there is an error {JSON.stringify(error)}</div>;
    }

    if (loading) {
        return <h1>hey i'm loading</h1>;
    }

    return data ? (
        <ReusuableTable
            columns={TransactionsColumns}
            data={data.getTransactionByMonthAndYear}
        />
    ) : (
        <h1>i'm waiting for data!!!</h1>
    );
};
