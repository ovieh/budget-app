import { makeStyles, TextField } from '@material-ui/core';
import { FC } from 'react';
import { ReusuableTable } from '../../../components/Table/ReusableTable';
import { CategoriesQuery, useUpdateCategoryMutation } from '../../../generated/graphql';
import { useForm } from 'react-hook-form';

interface CategoriesTableProps {
    data: CategoriesQuery;
}

const CategoriesTable: FC<CategoriesTableProps> = ({ data }) => {
    const columns = [
        { Header: 'Category', accessor: 'name' },
        { Header: 'Budget', accessor: 'budget', Cell: InputCell },
    ];
    return (
        <ReusuableTable
            data={data.getCategories}
            columns={columns}
            toolbarConfig={{ search: false, title: 'Categories' }}
        />
    );
};

export default CategoriesTable;

interface InputCellProps {
    cell: any;
    row: any;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: theme.spacing(10),
    },
}));

const InputCell: FC<InputCellProps> = ({ cell, row }) => {
    const classes = useStyles();

    const { register, errors, handleSubmit } = useForm({ mode: 'onBlur' });
    const name = row.original.name;
    const id = row.original.id;

    const [updateCategory] = useUpdateCategoryMutation();

    const onSubmit = async (data: any) => {
        updateCategory({
            variables: {
                id: parseInt(id, 10),
                name: Object.keys(data)[0],
                budget: parseInt(Object.values(data)[0] as string, 10),
            },
        });
    };

    return (
        <TextField
            className={classes.root}
            variant='outlined'
            size='small'
            inputRef={register({
                required: 'must be a number',
                min: 0,
                max: 100000,
            })}
            name={name}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            inputProps={{ 'data-testid': name }}
            defaultValue={cell.value}
            onBlur={handleSubmit(onSubmit)}
        />
    );
};
