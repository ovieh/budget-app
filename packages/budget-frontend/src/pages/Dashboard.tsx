import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { TransactionsTable } from './Transactions/Components/TransactionsTable';

interface Props {}
export const Dashboard: React.FC<Props> = () => {
    return <Layout main={<Transactions />} />;
};

const Transactions = () => {
    // const { data: yearMonth, loading } = useGetYearMonthQuery();
    const [active, setActive] = useState(0);

    return (
        <>
            <TransactionsTable />
        </>
    );
};
