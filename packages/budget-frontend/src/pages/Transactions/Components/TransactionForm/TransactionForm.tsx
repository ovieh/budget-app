import React from 'react';
import {
    Container,
    Paper,
    // FormControl,
    // InputLabel,
    Typography,
    TextField,
    Grid,
    // MenuItem,
    Button,
    createStyles,
    makeStyles,
    Theme,
    // Select,
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FileUpload } from '../../../../components/FileUpload';
import {
    useCreateTransactionMutation,
    YearMonth,
    DebitsByMonthAndYearDocument,
} from '../../../../generated/graphql';
// import { TextField } from '../../../../components/Form/TextField/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            paddingTop: theme.spacing(2),
        },
    })
);

export const TransactionForm: React.FC<YearMonth> = ({ month, year }) => {
    const classes = useStyles();
    const [addTransaction] = useCreateTransactionMutation();

    const FormFields = [
        { name: 'date', placeholder: 'Transaction Date' },
        { name: 'description', placeholder: 'Transaction Description' },
        { name: 'debitAmount', placeholder: 'Amount' },
        { name: 'balance', placeholder: 'Balance' },
    ];

    return (
        <Paper style={{ minHeight: '20rem' }}>
            {/* <Grid container> */}
            <Container>
                <FileUpload />
            </Container>
            {/* </Grid> */}
            <Formik
                initialValues={{
                    date: '',
                    type: 'none',
                    sortCode: '0',
                    description: '',
                    accountNumber: '0',
                    debitAmount: '',
                    creditAmount: '0',
                    balance: '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    await addTransaction({
                        variables: {
                            date: values.date,
                            type: values.type,
                            sortCode: values.sortCode,
                            description: values.description,
                            accountNumber: values.accountNumber,
                            debitAmount: parseFloat(values.debitAmount),
                            creditAmount: parseFloat(values.creditAmount),
                            balance: parseFloat(values.balance),
                        },
                        refetchQueries: [
                            {
                                query: DebitsByMonthAndYearDocument,
                                variables: {
                                    month: month ? month : parseFloat(values.date.split('/')[1]),
                                    year: year ? year : parseFloat(values.date.split('/')[2]),
                                },
                            },
                        ],
                    });
                    setSubmitting(false);
                }}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <Container>
                            <Typography variant='h6' align='left' className={classes.label}>
                                Create New Category
                            </Typography>
                            <Grid container spacing={2}>
                                {FormFields.map(({ name, placeholder }) => (
                                    <Grid item xs={12} key={name}>
                                        <Field
                                            name={name}
                                            placeholder={placeholder}
                                            fullWidth
                                            required
                                            variant='outlined'
                                            size='small'
                                            label={placeholder}
                                            as={TextField}
                                        />
                                    </Grid>
                                ))}

                                <Grid item xs={12}>
                                    <Button
                                        type='submit'
                                        disabled={isSubmitting}
                                        variant='contained'
                                        centerRipple
                                        color='primary'
                                        fullWidth
                                        size='small'
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
};
