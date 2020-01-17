import React from 'react';
import { GetYearMonthQuery, useTransactionByMonthAndYearQuery } from '../generated/graphql';
import { ReusuableTable } from './ReusableTable';

interface Props {
    yearMonth: GetYearMonthQuery;
    active: number;
    handleClickOpen?: () => void;
}

export const TransactionsTable: React.FC<Props> = ({ yearMonth, active, handleClickOpen }) => {
    const { data, error, loading } = useTransactionByMonthAndYearQuery({
        // skip: !yearMonth.getYearMonth.length,
        variables: {
            month: yearMonth.getYearMonth[active].month,
            year: yearMonth.getYearMonth[active].year,
            skip: 0,
            take: 10,
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
            handleClickOpen={handleClickOpen}
        />
    ) : (
        <h1>i'm waiting for data!!!</h1>
    );
};
