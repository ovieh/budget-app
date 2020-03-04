import React, { useMemo, useState, useEffect } from 'react';
import {
    GetYearMonthQuery,
    useTransactionByMonthAndYearQuery,
    useCategoriesQuery,
    useUpdateTransactionCategoryMutation,
    Category,
} from '../generated/graphql';
import { ReusuableTable } from './ReusableTable';
import { Select, MenuItem } from '@material-ui/core';

interface Props {
    yearMonth: GetYearMonthQuery;
    active: number;
    handleClickOpen?: () => void;
}

export const TransactionsTable: React.FC<Props> = ({ yearMonth, active }) => {
    const { data, error, loading } = useTransactionByMonthAndYearQuery({
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
                        id: id,
                        categoryId,
                    },
                });
        };

        const onChange = (e: { target: any }) => {
            setValue(e.target.value);
        };

        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);
        // TODO: fix below, shouldn't need !
        useEffect(() => {
            data?.getCategories
                .filter(({ name }: Category) => name === value)
                .map(({ id }) => setCategoryId(parseInt(id!))); //  TODO: This is bad
        }, [data, value]);

        return (
            <Select onBlur={onBlur} onChange={onChange} name='category' value={initialValue}>
                {data?.getCategories.map(({ id, name }, i) => (
                    <MenuItem value={name} key={i}>
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
            { Header: 'Debit Amount', accessor: 'debitAmount' },
            { Header: 'Credit Amount', accessor: 'creditAmount' },
            { Header: 'Balance', accessor: 'balance' },
            { Header: 'Category', accessor: 'category.name', Cell: EditableCell },
        ],
        []
    );

    if (error) {
        return <div>there is an error {JSON.stringify(error)}</div>;
    }

    if (loading) {
        return <h1>hey i'm loading</h1>;
    }
    console.log(data);
    return data ? (
        <ReusuableTable columns={TransactionsColumns} data={data.getTransactionByMonthAndYear} />
    ) : (
        <h1>i'm waiting for data!!!</h1>
    );
};
