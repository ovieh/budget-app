import React, { Fragment } from 'react';
import {
    useGetTransactionsQuery,
    useCreateTransactionMutation,
    GetTransactionsDocument,
} from '../generated/graphql';
import styled from '@emotion/styled/macro';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ReusuableTable } from '../components/ReusableTable';
import { LoggedInNav } from '../components/LoggedInNav';
import { Container, Grid, Paper } from '@material-ui/core';
import { YearMonthTab } from '../components/YearMonthTab';

interface Props {}

export const Transactions: React.FC<Props> = () => {
    const Wrapper = styled.div`
        display: flex;
        section,
        aside {
            background: whitesmoke;
            margin: 2.5rem;
        }
    `;

    const Section = styled.section`
        /* background: whitesmoke; */
        flex: 1 60%;
    `;

    const Panel = styled.aside`
        /* background:  */
        flex: 2 40%;
        padding: 15px;
    `;

    const StyledDiv = styled.div`
        padding: 5px;
        input {
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 0.75rem;
        }
    `;

    const Button = styled.button`
        border: 1px solid black;
        background: white;
        color: black;
        border-radius: 5px;
    `;

    const { data, error, loading } = useGetTransactionsQuery({
        errorPolicy: 'all',
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
                        <YearMonthTab />
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
