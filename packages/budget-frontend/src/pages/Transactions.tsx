import React, { useState } from 'react';
import {
    useGetTransactionsQuery,
    useCreateTransactionMutation
} from '../generated/graphql';
import styled from '@emotion/styled/macro';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ReusuableTable } from '../components/ReusableTable';

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
    `;

    const Button = styled.button`
        border: 1px solid black;
        background: white;
        color: black;
        border-radius: 5px;
    `;

    // const [transactionDate, setTransactionDate] = useState('');
    // const [transactionType, setTransactionType] = useState('');
    // const [sortCode, setSortcode] = useState('');
    // const [transactionDescription, setTransactionDescription] = useState('');
    // const [accountNumber, setAccountNumber] = useState('');
    // const [debitAmount, setDebitAmount] = useState(0);
    // const [creditAmount, setCreditAmount] = useState(0);
    // const [balance, setBalance] = useState(0);

    // const [transaction, setTransaction] = useState({
    //     date: ''
    // });

    const { data, error, loading } = useGetTransactionsQuery();

    const [addTransaction] = useCreateTransactionMutation();

    const TransactionsColumns = [
        { Header: 'Date', accessor: 'transactionDate' },
        { Header: 'Description', accessor: 'transactionDescription' },
        { Header: 'Debit Amount', accessor: 'debitAmount' },
        { Header: 'Credit Amount', accessor: 'creditAmount' },
        { Header: 'Balance', accessor: 'balance' }
    ];

    if (error) {
        return <div>{error.message}</div>;
    }

    if (loading) {
        return <div>Loading Transactions</div>;
    }

    // const handleChange = (e: any) => {
    //     console.log(e);
    //     setTransaction({
    //         ...transaction,
    //         [e.currentTarget.name]: e.currentTarget.value
    //     });
    // };

    return (
        <Wrapper>
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
                        balance: ''
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values);
                        const response = await addTransaction({
                            variables: {
                                transactionDate: values.transactionDate,
                                transactionType: values.transactionType,
                                sortCode: values.sortCode,
                                transactionDescription:
                                    values.transactionDescription,
                                accountNumber: values.accountNumber,
                                debitAmount: parseFloat(values.debitAmount),
                                creditAmount: parseFloat(values.creditAmount),
                                balance: parseFloat(values.balance)
                            }
                        });
                        console.log(response);
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <input
                                name='transactionDate'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.transactionDate}
                                placeholder='Transaction Date'
                            />
                            {errors.transactionDate &&
                                touched.transactionDate &&
                                errors.transactionDate}
                            <input
                                name='transactionDescription'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.transactionDescription}
                                placeholder='Transaction Description'
                            />
                            {errors.transactionDescription &&
                                touched.transactionDescription &&
                                errors.transactionDescription}
                            <input
                                name='transactionType'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.transactionType}
                                placeholder='Transaction Type'
                            />
                            {errors.transactionType &&
                                touched.transactionType &&
                                errors.transactionType}
                            <input
                                name='sortCode'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sortCode}
                                placeholder='Sortcode'
                            />
                            {errors.sortCode &&
                                touched.sortCode &&
                                errors.sortCode}
                            <input
                                name='accountNumber'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.accountNumber}
                                placeholder='Account Number'
                            />
                            {errors.accountNumber &&
                                touched.accountNumber &&
                                errors.accountNumber}
                            <input
                                name='debitAmount'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.debitAmount}
                                placeholder='Debit Amount'
                            />
                            {errors.debitAmount &&
                                touched.debitAmount &&
                                errors.debitAmount}
                            <input
                                name='creditAmount'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.creditAmount}
                                placeholder='Credit Amount'
                            />
                            {errors.creditAmount &&
                                touched.creditAmount &&
                                errors.creditAmount}
                            <input
                                name='balance'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.balance}
                                placeholder='Balance'
                            />
                            {errors.balance &&
                                touched.balance &&
                                errors.balance}
                            <Button type='submit' disabled={isSubmitting}>
                                Submit
                            </Button>
                        </form>
                    )}
                </Formik>
            </Panel>
        </Wrapper>
    );
};
