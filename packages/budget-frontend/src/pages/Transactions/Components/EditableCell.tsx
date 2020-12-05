import { MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import {
    TransactionsByMonthAndYearDocument,
    useCategoriesQuery,
    useUpdateTransactionCategoryMutation,
} from '../../../generated/graphql';

interface EditableCellTypes {
    cell: any;
    row: any;
    column: any;
}

export const EditableCell: React.FC<EditableCellTypes> = ({
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
