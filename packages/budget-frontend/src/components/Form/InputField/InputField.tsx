import React from 'react';
import TextField from '@material-ui/core/TextField';
import { FieldProps, FieldAttributes, useField } from 'formik';

export const InputField: React.FC<FieldAttributes<{}>> = ({ placeholder, ...props }) => {
    const [field, meta] = useField<{}>(props);
    console.log(field);
    return (
        <TextField
            // name={name}
            placeholder={placeholder}
            // fullWidth
            // required
            // variant='outlined'
            // size='small'
            // label={placeholder}
            {...field}
        />
    );
};
