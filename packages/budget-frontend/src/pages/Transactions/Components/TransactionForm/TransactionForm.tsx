import React, { useContext } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Grid,
    Button,
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core';
import { FileUpload } from '../../../../components/FileUpload';
import { useForm } from 'react-hook-form';
import {
    useCreateTransactionMutation,
    TransactionsByMonthAndYearDocument,
    SumDebitsByYearMonthDocument,
    Transaction,
} from '../../../../generated/graphql';
import { ActiveDateContext, updateActiveDate } from '../../../../Contexts/ActiveDate';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            paddingTop: theme.spacing(2),
        },
    })
);

const transactionSchema = yup.object().shape({
    date: yup.date().required('Date is required'),
    description: yup.string().min(2, 'Too Short!').max(20, 'Too long!').required('Requiried'),
    debitAmount: yup.number().positive('Must be positive').required('Must be a number'),
    balance: yup.number().positive('Must be positive').required('Must be a number'),
    type: yup.string().default(''),
    sortCode: yup.string().default('0'),
    creditAmount: yup.string().default('0'),
    accountNumber: yup.string().default('0'),
});

export const TransactionForm: React.FC<{}> = () => {
    const classes = useStyles();
    const [addTransaction] = useCreateTransactionMutation();
    const { dispatch } = useContext(ActiveDateContext);

    const FormFields = [
        { name: 'date', placeholder: 'Transaction Date', type: 'date' },
        { name: 'description', placeholder: 'Transaction Description', type: 'text' },
        { name: 'debitAmount', placeholder: 'Amount', type: 'text' },
        { name: 'balance', placeholder: 'Balance', type: 'text' },
    ];

    const { register, errors, handleSubmit, formState } = useForm({
        resolver: yupResolver(transactionSchema),
    });

    const { isSubmitting } = formState;

    // TODO: Figure out better way of dealing with dates!
    const updateContextDate = (date: string) => {
        const month = date.split('-')[1];
        const year = date.split('-')[0];
        dispatch({
            type: updateActiveDate,
            payload: { year: parseInt(year), month: parseInt(month) },
        });
    };

    const onSubmit = async (values: Transaction) => {
        const date = new Date(values.date);
        // adding 1 is cRazY !!!
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const newTransaction = await addTransaction({
            variables: {
                date: values.date,
                type: values.type,
                sortCode: values.sortCode,
                description: values.description,
                accountNumber: values.accountNumber,
                debitAmount: Number(values.debitAmount),
                creditAmount: Number(values.creditAmount),
                balance: Number(values.balance),
            },
            awaitRefetchQueries: true,
            refetchQueries: [
                {
                    query: TransactionsByMonthAndYearDocument,
                    variables: {
                        month,
                        year,
                    },
                },
                {
                    query: SumDebitsByYearMonthDocument,
                    variables: {
                        year,
                        month,
                    },
                },
            ],
        });
        newTransaction.data && updateContextDate(newTransaction.data.createTransaction.date);
    };

    return (
        <Paper style={{ minHeight: '20rem' }}>
            <Container>
                <FileUpload />
            </Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Typography variant='h6' align='left' className={classes.label}>
                        Create New Category
                    </Typography>
                    <Grid container spacing={2}>
                        {FormFields.map(({ name, placeholder, type }) => (
                            <Grid item xs={12} key={name}>
                                <TextField
                                    name={name}
                                    placeholder={placeholder}
                                    fullWidth
                                    required
                                    variant='outlined'
                                    size='small'
                                    label={placeholder}
                                    type={type}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputRef={register()}
                                    error={!!errors[name]}
                                    helperText={errors[name]?.message}
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
            </form>
        </Paper>
    );
};
