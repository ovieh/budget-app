import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { YearMonthTab } from '../components/YearMonthTab';
import { TransactionsTable } from '../components/TransactionsTable';
import {
    useGetYearMonthQuery,
    useChartDataQuery,
    ChartData,
    GetYearMonthQuery,
    YearMonth,
} from '../generated/graphql';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Line,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const Table: React.FC = () => {
    const { error, data: yearMonth, loading } = useGetYearMonthQuery();

    const [active, setActive] = useState(yearMonth!.getYearMonth.length - 1);

    if (error) {
        return <pre>{JSON.stringify(error, null, 2)}</pre>;
    }

    if (loading) {
        return null;
    }

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

interface ChartProps {
    data: any;
}

const Chart: React.FC<ChartProps> = ({ data: yearMonth }) => {
    // strip __typename
    yearMonth.forEach((date: YearMonth) => {
        delete date.__typename;
    });

    const { data, loading, error } = useChartDataQuery({
        variables: {
            date: yearMonth,
        },
    });
    if (loading) return <span>loading</span>;

    if (error) return <span>error</span>;

    const chartData = data?.chartData.payload.map((el: any) => ({
        ...el,
        color: 'red',
    }));

    if (chartData) {
        return <span>ain't got nothign</span>;
    }

    const colors = ['red', 'pink', 'orange', 'purple', 'blue', 'grey', 'teal'];
    const categories = Object.keys(data?.chartData.payload[0]);
    return (
        <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Legend height={36} />
                {categories
                    .filter(el => el !== 'name' && el !== 'color')
                    .map((category, i) => (
                        <Line
                            type='monotone'
                            dataKey={category}
                            key={category}
                            stroke={colors[i]}
                        />
                    ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

interface Props {}
export const OldTransactions: React.FC<Props> = () => {
    const { data, loading, error } = useGetYearMonthQuery();

    if (error) {
        return <pre>error.message</pre>;
    }

    if (loading) {
        return null;
    }

    return <Layout main={<Table />} chart={<Chart data={data?.getYearMonth} />} />;
};
