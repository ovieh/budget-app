import React, { useMemo, useState, useEffect, useContext } from 'react';
import {
    useCategoriesQuery,
    useUpdateTransactionCategoryMutation,
    useTransactionsByMonthAndYearQuery,
    TransactionsByMonthAndYearDocument,
} from '../../../generated/graphql';
import { ReusuableTable } from '../../../components/ReusableTable';
import { Select, MenuItem } from '@material-ui/core';
import { TablePlaceholder } from '../../../components/TablePlaceholder/TablePlaceholder';
import { ActiveDateContext, updateActiveDate } from '../../../context';

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
        variables: { year: activeDate?.year, month: activeDate?.month },
    });

    console.log(data);

    useEffect(() => {
        data?.MonthByDate[0]?.month &&
            dispatch({
                type: updateActiveDate,
                payload: { month: data.MonthByDate[0].month, year: data.MonthByDate[0].year },
            });
    }, [data, dispatch]);

    // TODO: Figure out these types
    interface EditableCellTypes {
        cell: any;
        row: any;
        column: any;
    }

    const EditableCell: React.FC<EditableCellTypes> = ({
        cell: { value: initialValue },
        row: { original },
        column,
    }) => {
        const { data } = useCategoriesQuery();
        const [updateCategory] = useUpdateTransactionCategoryMutation();
        const [value, setValue] = useState(initialValue);
        const [categoryId, setCategoryId] = useState(0);

        const onBlur = () => {
            updateCategory({
                variables: {
                    id: original.id,
                    categoryId,
                },
                refetchQueries: [
                    {
                        query: TransactionsByMonthAndYearDocument,
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

    // Not sure useMemo is necessary?
    const TransactionsColumns = useMemo(
        () => [
            { Header: 'Date', accessor: 'date' },
            { Header: 'Description', accessor: 'description' },
            { Header: 'Amount', accessor: 'debitAmount' },
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

    return data!.MonthByDate.length > 0 ? (
        <ReusuableTable columns={TransactionsColumns} data={data!.MonthByDate[0].transactions} />
    ) : (
        <h1>i'm waiting for data!!!</h1>
    );
};
