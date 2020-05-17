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

export const TransactionForm: React.FC<{}> = () => {
    const classes = useStyles();
    const [addTransaction] = useCreateTransactionMutation();

    const FormFields = [
        { name: 'date', placeholder: 'Transaction Date', type: 'date' },
        { name: 'description', placeholder: 'Transaction Description', type: 'text' },
        { name: 'debitAmount', placeholder: 'Amount', type: 'text' },
        { name: 'balance', placeholder: 'Balance', type: 'text' },
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
                    const date = new Date(values.date);
                    // adding 1 is cRazY !!!
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();

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
                        awaitRefetchQueries: true,
                        refetchQueries: [
                            {
                                query: DebitsByMonthAndYearDocument,
                                variables: {
                                    month,
                                    year,
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
                                {FormFields.map(({ name, placeholder, type }) => (
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
                                            type={type}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
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
