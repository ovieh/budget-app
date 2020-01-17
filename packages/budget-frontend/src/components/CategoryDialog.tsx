import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
} from '@material-ui/core';
import React from 'react';
import { useCategoriesQuery, useUpdateTransactionCategoryMutation } from '../generated/graphql';

interface Props {
    open: boolean;
    handleClose: () => void;
}

export const CategoryDialog: React.FC<Props> = ({ open, handleClose }) => {
    const { data } = useCategoriesQuery();
    const [updateCategory] = useUpdateTransactionCategoryMutation();

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby='category-dialog'>
                <DialogTitle id='category-dialog'>Update Category</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel id='category-dialog'>Category</InputLabel>
                        <Select labelId='category-dialog' fullWidth>
                            {data?.getCategories.map(category => (
                                <MenuItem key={category.name} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary' variant='contained'>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color='primary' variant='contained'>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
