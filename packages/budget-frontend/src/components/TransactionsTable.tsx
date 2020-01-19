import React, { useMemo, useState, useEffect } from 'react';
import {
    GetYearMonthQuery,
    useTransactionByMonthAndYearQuery,
    useCategoriesQuery,
    useUpdateTransactionCategoryMutation,
} from '../generated/graphql';
import { ReusuableTable } from './ReusableTable';
// import { Formik, Field, FormikProps, Form, FormikValues } from 'formik';
import { Select, MenuItem } from '@material-ui/core';
// import { Cell, Row, Column, UseColumnsValues } from 'react-table';

interface Props {
    yearMonth: GetYearMonthQuery;
    active: number;
    handleClickOpen?: () => void;
    setId?: React.Dispatch<any>;
}

export const TransactionsTable: React.FC<Props> = ({
    yearMonth,
    active,
    handleClickOpen,
    setId,
}) => {
    const { data, error, loading } = useTransactionByMonthAndYearQuery({
        // skip: !yearMonth.getYearMonth.length,
        variables: {
            month: yearMonth.getYearMonth[active].month,
            year: yearMonth.getYearMonth[active].year,
            skip: 0,
            take: 10,
        },
    });

    // TODO: Figure out these types
    interface EditableCellTypes {
        cell: any;
        row: any;
        column: any;
        // transactionId: string;
    }

    const EditableCell: React.FC<EditableCellTypes> = ({
        cell: { value: initialValue },
        cell,
        row: {
            index,
            original: { id },
        },
        column,
    }) => {

        const { data } = useCategoriesQuery();
        const [updateCategory] = useUpdateTransactionCategoryMutation();
        const [value, setValue] = useState(initialValue);
        const [nameId, setNameId] = useState();


        const onBlur = () => {
            // Insert stuff here
            updateCategory({
                variables: {
                    id: id,
                    nameId: nameId,
                },
            });
        };

        const onChange = (e: { target: any }) => {
            setValue(e.target.value);
        };

        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        useEffect(() => {
            data?.getCategories.map(el => {
                if (el['name'] === value) {
                    setNameId(el.id);
                }
            });
        }, [data, value]);

        return (
            <Select onBlur={onBlur} onChange={onChange} name='category' value={initialValue}>
                {data?.getCategories.map(({ id, name }, i) => (
                    <MenuItem value={name}>{name}</MenuItem>
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
    const [transactionId, setTransactionId] = useState();

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
            // setId={setId}
            setTransactionId={setTransactionId}
            // index={value}
        />
    ) : (
        <h1>i'm waiting for data!!!</h1>
    );
};
