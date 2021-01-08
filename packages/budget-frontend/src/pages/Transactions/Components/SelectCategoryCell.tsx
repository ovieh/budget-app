import { MenuItem, Select } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { ActiveDateContext } from '../../../Contexts/ActiveDate';
import {
    MonthlySpendingChartDocument,
    TransactionsByMonthAndYearDocument,
    TransactionType,
    useCategoriesQuery,
    useUpdateTransactionCategoryMutation,
} from '../../../generated/graphql';

interface SelectCategoryCellTypes {
    cell?: any;
    row?: any;
    column?: any;
    selectedItems?: string[];
}

export const SelectCategoryCell: React.FC<SelectCategoryCellTypes> = ({
    cell: { value: initialValue } = {},
    row: { original } = {},
    selectedItems,
}) => {
    const { data } = useCategoriesQuery();
    const [updateCategory] = useUpdateTransactionCategoryMutation();
    const [value, setValue] = useState(initialValue);

    const [categoryId, setCategoryId] = useState(0);

    const {
        store: { activeDate },
    } = useContext(ActiveDateContext);

    const queryParams = {
        variables: {
            id: original?.id,
            categoryId,
        },
        refetchQueries: [
            {
                query: TransactionsByMonthAndYearDocument,
                variables: {
                    year: activeDate?.year,
                    month: activeDate?.month,
                    transactionType: TransactionType.Debit,
                },
            },
            {
                query: MonthlySpendingChartDocument,
                variables: {
                    year: activeDate?.year,
                    month: activeDate?.month,
                },
            },
        ],
    };

    const onBlur = async () => {
        if (selectedItems?.length) {
            const promises = selectedItems.map(id =>
                updateCategory({ ...queryParams, variables: { ...queryParams.variables, id } })
            );
            try {
                await Promise.all(promises);
            } catch (error) {
                console.log(error);
            }
        } else {
            await updateCategory(queryParams);
        }
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
        <Select
            onBlur={onBlur}
            onChange={onChange}
            name='category'
            value={value}
            defaultValue={data?.getCategories[0].name}
        >
            {data?.getCategories.map(({ id, name }) => (
                <MenuItem value={name} key={name}>
                    {name}
                </MenuItem>
            ))}
        </Select>
    );
};
