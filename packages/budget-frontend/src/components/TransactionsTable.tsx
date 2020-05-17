import React, { useMemo, useState, useEffect } from 'react';
import {
    GetYearMonthQuery,
    useCategoriesQuery,
    useUpdateTransactionCategoryMutation,
    useDebitsByMonthAndYearQuery,
    CategoriesDocument,
} from '../generated/graphql';
import { ReusuableTable } from './ReusableTable';
import { Select, MenuItem } from '@material-ui/core';
import { TablePlaceholder } from './TablePlaceholder/TablePlaceholder';

interface Props {
    yearMonth: GetYearMonthQuery;
    active: number;
    handleClickOpen?: () => void;
}

export const TransactionsTable: React.FC<Props> = ({ yearMonth, active }) => {
    const { data, error, loading } = useDebitsByMonthAndYearQuery({
        // skip: !yearMonth.getYearMonth.length,
        variables: {
            month: yearMonth.getYearMonth[active].month,
            year: yearMonth.getYearMonth[active].year,
        },
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
                            query: CategoriesDocument,
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

    // Not sure useMemo is necessary?
    const TransactionsColumns = useMemo(
        () => [
            { Header: 'Date', accessor: 'date' },
            { Header: 'Description', accessor: 'description' },
            { Header: 'Amount', accessor: 'debitAmount' },
            // { Header: 'Credit Amount', accessor: 'creditAmount' },
            // { Header: 'Balance', accessor: 'balance' },
            { Header: 'Category', accessor: 'category.name', Cell: EditableCell },
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
        <ReusuableTable columns={TransactionsColumns} data={data.getDebitsByMonthAndYear} />
    ) : (
        <h1>i'm waiting for data!!!</h1>
    );
};
