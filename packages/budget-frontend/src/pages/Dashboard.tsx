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
            {yearMonth?.getYearMonth.length && (
                <YearMonthTab data={yearMonth} active={active} setActive={setActive} />
            )}
            {yearMonth?.getYearMonth.length ? (
                <TransactionsTable yearMonth={yearMonth} active={active} />
            ) : (
                <div>Why don't you add some transactions?</div>
            )}
        </>
    );
};
