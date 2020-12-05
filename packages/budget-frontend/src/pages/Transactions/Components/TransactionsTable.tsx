import React, { useMemo, useEffect, useContext } from 'react';
import { useTransactionsByMonthAndYearQuery, TransactionType } from '../../../generated/graphql';
import { ReusuableTable } from '../../../components/Table/ReusableTable';
import { useMediaQuery, Theme } from '@material-ui/core';
import { TablePlaceholder } from '../../../components/TablePlaceholder/TablePlaceholder';
import { ActiveDateContext, updateActiveDate } from '../../../Contexts/ActiveDate';
import { EditableCell } from './EditableCell';
import { Cell } from 'recharts';

interface Props {
    handleClickOpen?: () => void;
}

export const TransactionsTable: React.FC<Props> = () => {
    const {
        store: { activeDate },
        dispatch,
    } = useContext(ActiveDateContext);

    const { data, loading, error } = useTransactionsByMonthAndYearQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            year: activeDate?.year,
            month: activeDate?.month,
            transactionType: TransactionType.Debit,
        },
    });

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    useEffect(() => {
        data?.MonthByDate[0]?.month &&
            dispatch({
                type: updateActiveDate,
                payload: { month: data.MonthByDate[0].month, year: data.MonthByDate[0].year },
            });
    }, [data, dispatch]);

    const TransactionsColumns = useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'date',
                Cell: (cell: any) => (!matches ? cell.value.split(/-(.+)/)[1] : cell.value),
            },
            { Header: matches ? 'Description' : 'Desc.', accessor: 'description' },
            {
                Header: matches ? 'Amount' : 'Amt.',
                accessor: 'debitAmount',
                Cell: (cell: any) => cell.value.toFixed(2),
            },
            {
                Header: 'Category',
                accessor: 'category.name',
                Cell: EditableCell,
            },
        ],
        [matches]
    );

    if (error) {
        return <div>there is an error {JSON.stringify(error)}</div>;
    }

    if (loading) {
        return <TablePlaceholder />;
    }

    return data!.MonthByDate.length > 0 ? (
        <ReusuableTable
            columns={TransactionsColumns}
            data={data!.MonthByDate[0].transactions}
            toolbarConfig={{ title: matches ? 'Transactions' : undefined, search: true }}
        />
    ) : (
        <h1>i'm waiting for data!!!</h1>
    );
};
