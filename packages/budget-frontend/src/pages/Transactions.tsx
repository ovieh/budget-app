import React, { Fragment, useState } from 'react';
import {
    useCreateTransactionMutation,
    useTransactionByMonthYearQuery,
    TransactionByMonthYearDocument,
    useGetYearMonthQuery,
} from '../generated/graphql';
import styled from '@emotion/styled/macro';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ReusuableTable } from '../components/ReusableTable';
import { LoggedInNav } from '../components/LoggedInNav';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
} from '@material-ui/core';
import { YearMonthTab } from '../components/YearMonthTab';

interface Props {}

export interface IYearMonth {
    year: number;
    month: number;
}

const Label = styled(Typography)`
    padding-top: 20px;
`;

export const Transactions: React.FC<Props> = () => {
    const { data: date } = useGetYearMonthQuery();

    const [yearMonth, setYearMonth] = useState<IYearMonth | undefined>({
        month: date?.getYearMonth[0].month || 2,
        year: date?.getYearMonth[0].year || 2020,
    });

    // TODO fix the above
    console.log(date?.getYearMonth[0].month);

    const { data, error, loading } = useTransactionByMonthYearQuery({
        skip: !date,
        variables: {
            month: yearMonth!.month,
            year: yearMonth!.year,
        },
    });

    const [addTransaction] = useCreateTransactionMutation();

    const TransactionsColumns = [
        { Header: 'Date', accessor: 'transactionDate' },
        { Header: 'Description', accessor: 'transactionDescription' },
        { Header: 'Debit Amount', accessor: 'debitAmount' },
        { Header: 'Credit Amount', accessor: 'creditAmount' },
        { Header: 'Balance', accessor: 'balance' },
        { Header: 'Category', accessor: 'category.name' },
    ];

    if (error) {
        return (
            <pre>
                Errors:{' '}
                {error?.graphQLErrors.map(({ message }, i) => (
                    <span key={i}>{message}</span>
                ))}
            </pre>
        );
    }

    // TODO handle loading better
    // if (loading) {
    //     return <div>Loading Transactions</div>;
    // }

    return (
        <Fragment>
            <LoggedInNav />
            <Grid
                container
                justify='space-evenly'
                spacing={2}
                style={{ marginTop: '20px' }}
            >
                <Grid item xs={7}>
                    <Paper>
                        <YearMonthTab setYearMonth={setYearMonth} />
                        {data && (
                            <ReusuableTable
                                columns={TransactionsColumns}
                                data={data.getTransactionByMonthAndYear}
                            />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper style={{ minHeight: '20rem' }}>
                        <Formik
                            initialValues={{
                                transactionDate: '',
                                transactionType: '',
                                sortCode: '',
                                transactionDescription: '',
                                accountNumber: '',
                                debitAmount: '',
                                creditAmount: '',
                                balance: '',
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                await addTransaction({
                                    variables: {
                                        transactionDate: values.transactionDate,
                                        transactionType: values.transactionType,
                                        sortCode: values.sortCode,
                                        transactionDescription:
                                            values.transactionDescription,
                                        accountNumber: values.accountNumber,
                                        debitAmount: parseFloat(
                                            values.debitAmount
                                        ),
                                        creditAmount: parseFloat(
                                            values.creditAmount
                                        ),
                                        balance: parseFloat(values.balance),
                                    },
                                    refetchQueries: [
                                        {
                                            query: TransactionByMonthYearDocument,
                                            variables: {
                                                month: yearMonth!.month,
                                                year: yearMonth!.year,
                                            },
                                        },
                                    ],
                                });
                                setSubmitting(false);
                            }}
                        >
                            {({ handleSubmit, isSubmitting }) => (
                                <Form>
                                    <Container>
                                        <Label variant='h6' align='left'>
                                            Enter Transaction
                                        </Label>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Field
                                                    item
                                                    name='transactionDate'
                                                    placeholder='Transaction Date'
                                                    as={TextField}
                                                    fullWidth
                                                    required
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    item
                                                    name='transactionDescription'
                                                    placeholder='Transaction Description'
                                                    as={TextField}
                                                    fullWidth
                                                    required
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl required>
                                                    <InputLabel id='type'>
                                                        Type
                                                    </InputLabel>
                                                    <Field
                                                        item
                                                        name='transactionType'
                                                        // placeholder='Transaction Type'
                                                        as={Select}
                                                        required
                                                        variant='outlined'
                                                        labelId='type'
                                                    >
                                                        <MenuItem value={'DEB'}>
                                                            DEB
                                                        </MenuItem>
                                                        <MenuItem value={'DD'}>
                                                            DD
                                                        </MenuItem>
                                                        <MenuItem value={'CPT'}>
                                                            CPT
                                                        </MenuItem>
                                                        <MenuItem value={'FPO'}>
                                                            FPO
                                                        </MenuItem>
                                                    </Field>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    item
                                                    name='sortCode'
                                                    placeholder='Sort Code'
                                                    as={TextField}
                                                    fullWidth
                                                    required
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    item
                                                    name='accountNumber'
                                                    placeholder='accountNumber'
                                                    as={TextField}
                                                    fullWidth
                                                    required
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    item
                                                    name='debitAmount'
                                                    placeholder='Debit Amount'
                                                    as={TextField}
                                                    fullWidth
                                                    required
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    item
                                                    name='creditAmount'
                                                    placeholder='Credit Amount'
                                                    as={TextField}
                                                    fullWidth
                                                    required
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Field
                                                    item
                                                    name='balance'
                                                    placeholder='balance'
                                                    as={TextField}
                                                    fullWidth
                                                    required
                                                    variant='outlined'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    type='submit'
                                                    disabled={isSubmitting}
                                                    variant='contained'
                                                    centerRipple
                                                    color='primary'
                                                    fullWidth
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
                </Grid>
            </Grid>
            {/* <Wrapper>
                <Section>
                    {data && (
                        <ReusuableTable
                            columns={TransactionsColumns}
                            data={data.getTransactions}
                        />
                    )}
                </Section>
                <Panel>
                    <Formik
                        initialValues={{
                            transactionDate: '',
                            transactionType: '',
                            sortCode: '',
                            transactionDescription: '',
                            accountNumber: '',
                            debitAmount: '',
                            creditAmount: '',
                            balance: '',
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            await addTransaction({
                                variables: {
                                    transactionDate: values.transactionDate,
                                    transactionType: values.transactionType,
                                    sortCode: values.sortCode,
                                    transactionDescription:
                                        values.transactionDescription,
                                    accountNumber: values.accountNumber,
                                    debitAmount: parseFloat(values.debitAmount),
                                    creditAmount: parseFloat(
                                        values.creditAmount
                                    ),
                                    balance: parseFloat(values.balance),
                                },
                                refetchQueries: [
                                    { query: GetTransactionsDocument },
                                ],
                            });
                            setSubmitting(false);
                        }}
                    >
                        {({ handleSubmit, isSubmitting }) => (
                            <Form onSubmit={handleSubmit}>
                                <StyledDiv>
                                    <Field
                                        name='transactionDate'
                                        placeholder='Transaction Date'
                                    />
                                    <Field
                                        name='transactionDescription'
                                        placeholder='Description'
                                    />
                                    <Field
                                        name='transactionType'
                                        placeholder='Transaction Type'
                                    />
                                    <Field
                                        name='sortCode'
                                        placeholder='Sortcode'
                                    />
                                    <Field
                                        name='accountNumber'
                                        placeholder='Account Number'
                                    />
                                    <Field
                                        name='debitAmount'
                                        placeholder='Debit Amount'
                                    />
                                    <Field
                                        name='creditAmount'
                                        placeholder='Credit Amount'
                                    />
                                    <Field
                                        name='balance'
                                        placeholder='Balance'
                                    />
                                </StyledDiv>

                                <Button type='submit' disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Panel>
            </Wrapper> */}
        </Fragment>
    );
};
