import React from 'react';
import { useGetTransactionsQuery } from '../generated/graphql';
import styled from '@emotion/styled/macro';
import { ReusuableTable } from '../components/ReusableTable';

interface Props {}

export const Transactions: React.FC<Props> = () => {
    const { data, error, loading } = useGetTransactionsQuery();

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
            <Panel />
        </Wrapper>
    );
};
