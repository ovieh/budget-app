import React from 'react';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { FieldProps } from 'formik';

export const TextField: React.FC<TextFieldProps & FieldProps> = ({ name, placeholder, field }) => {
    return (
        <MuiTextField
            name={name}
            placeholder={placeholder}
            fullWidth
            required
            variant='outlined'
            size='small'
            label={placeholder}
            {...field}
        />
    );
};
