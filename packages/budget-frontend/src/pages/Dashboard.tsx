import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { YearMonthTab } from '../components/YearMonthTab';
import { TransactionsTable } from '../components/TransactionsTable';
import { useGetYearMonthQuery } from '../generated/graphql';

interface Props {}
export const Dashboard: React.FC<Props> = () => {
    return <Layout main={<Transactions />} />;
};

const Transactions = () => {
    const { data: yearMonth, loading } = useGetYearMonthQuery();
    const [active, setActive] = useState(0);

    return (
        <>
            {yearMonth?.getYearMonth.length ? (
                <TransactionsTable year={2019} month={9} />
            ) : (
                <div>Why don't you add some transactions?</div>
            )}
        </>
    );
};
