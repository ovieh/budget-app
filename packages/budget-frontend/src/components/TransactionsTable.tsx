import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
    useCategoriesQuery,
    useUpdateTransactionCategoryMutation,
    useDebitsByMonthAndYearQuery,
    CategoriesDocument,
    DebitsByMonthAndYearDocument,
    useTransactionsByMonthAndYearQuery,
    TransactionsByMonthAndYearQuery,
} from '../generated/graphql';
import { ReusuableTable } from './ReusableTable';
import { Select, MenuItem } from '@material-ui/core';
import { TablePlaceholder } from './TablePlaceholder/TablePlaceholder';

interface Props {
    // active: number;
    handleClickOpen?: () => void;
}

export const TransactionsTable: React.FC<Props> = () => {
    const { data, loading, error, fetchMore } = useTransactionsByMonthAndYearQuery({
        variables: {
            limit: 5,
            page: 1,
        },
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });

    // TODO: Figure out these types
    interface EditableCellTypes {
        cell: any;
        row: any;
        column: any;
    }

    const EditableCell: React.FC<EditableCellTypes> = ({
        cell: { value: initialValue },
        row: {
            index,
            original: { id },
        },
        column,
    }) => {
        const { data } = useCategoriesQuery();
        const [updateCategory] = useUpdateTransactionCategoryMutation();
        const [value, setValue] = useState(initialValue);
        const [categoryId, setCategoryId] = useState(0);

        const onBlur = () => {
            categoryId &&
                updateCategory({
                    variables: {
                        id,
                        categoryId,
                    },
                    refetchQueries: [
                        {
                            query: DebitsByMonthAndYearDocument,
                            variables: {},
                        },
                    ],
                });
        };

        const onChange = (e: React.ChangeEvent<{ value: unknown }>) => {
            setValue(e.target.value as number);
        };

        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);
        // TODO: fix below, shouldn't need !
        useEffect(() => {
            data?.getCategories
                .filter(({ name }) => name === value)
                .map(({ id }) => setCategoryId(Number(id))); //  TODO: This is bad
        }, [data, value]);

        return (
            <Select onBlur={onBlur} onChange={onChange} name='category' value={value}>
                {data?.getCategories.map(({ id, name }) => (
                    <MenuItem value={name} key={name}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        );
    };
    
    const onLoadMore = async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
        pageIndex > 0 &&
            (await fetchMore({
                variables: {
                    page: pageIndex + 1,
                    limit: 5,
                },
                updateQuery: (prev: any, { fetchMoreResult }: any) => {
                    if (!fetchMoreResult) return prev.MonthByDate.data;

                    const MonthByDate = Object.assign({}, prev.MonthByDate, {
                        data: [...prev.MonthByDate.data, ...fetchMoreResult.MonthByDate.data],
                        page: fetchMoreResult.MonthByDate.page,
                    });

                    return { MonthByDate };
                },
            }));
    };

    // Not sure useMemo is necessary?
    const TransactionsColumns = useMemo(
        () => [
            { Header: 'Date', accessor: 'date' },
            { Header: 'Description', accessor: 'transactions[0].description' },
            { Header: 'Amount', accessor: 'transactions[0].debitAmount' },
            { Header: 'Category', accessor: 'categories[0].name', Cell: EditableCell },
        ],
        []
    );

    if (error) {
        return <div>there is an error {JSON.stringify(error)}</div>;
    }

    if (loading) {
        return <TablePlaceholder />;
    }

    return data ? (
        <ReusuableTable
            columns={TransactionsColumns}
            data={data.MonthByDate.data}
            pageCount={data.MonthByDate.pageCount}
            onLoadMore={(data: any) => onLoadMore(data)}
            count={data.MonthByDate.totalCount}
        />
    ) : (
        <h1>i'm waiting for data!!!</h1>
    );
};
