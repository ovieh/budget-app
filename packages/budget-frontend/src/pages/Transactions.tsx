import React, { Fragment, useState } from 'react';
import {
    useCreateTransactionMutation,
    useTransactionByMonthYearQuery,
    YearMonth,
} from '../generated/graphql';
import styled from '@emotion/styled/macro';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ReusuableTable } from '../components/ReusableTable';
import { LoggedInNav } from '../components/LoggedInNav';
import { Container, Grid, Paper } from '@material-ui/core';
import { YearMonthTab } from '../components/YearMonthTab';

interface Props {}

export const Transactions: React.FC<Props> = () => {
    const [active, setActive] = useState(0);
    const [yearMonth, setYearMonth] = useState<YearMonth>({
        month: 1,
        year: 2020,
    });

    const { data, error, loading } = useTransactionByMonthYearQuery({
        errorPolicy: 'all',
        variables: {
            month: yearMonth.month,
            year: yearMonth.year,
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
    if (loading) {
        return <div>Loading Transactions</div>;
    }
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
                    <Paper style={{ height: '40rem' }}>
                        <YearMonthTab
                            active={active}
                            setActive={setActive}
                            setYearMonth={setYearMonth}
                        />
                        {data && (
                            <ReusuableTable
                                columns={TransactionsColumns}
                                data={data.getTransactionByMonthAndYear}
                            />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper style={{ height: '40rem' }}></Paper>
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
