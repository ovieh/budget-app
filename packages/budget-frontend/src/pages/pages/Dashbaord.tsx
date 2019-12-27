import React from 'react';
import { useGetTransactionsQuery } from '../../generated/graphql';
import styled from '@emotion/styled/macro';
import { ReusuableTable } from '../../components/ReusableTable';

interface Props {}

export const Dashboard: React.FC<Props> = () => {
    const { data, error, loading } = useGetTransactionsQuery();

    const Section = styled.section`
        display: flex;
    `;

    const DashboardColumns = [
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
        return <div>Loading Dashboard</div>;
    }

    return (
        <Section>
            {data && (
                <ReusuableTable
                    columns={DashboardColumns}
                    data={data.getTransactions}
                />
            )}
        </Section>
    );
};
