import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { YearMonthTab } from '../components/YearMonthTab';
import { TransactionsTable } from '../components/TransactionsTable';
import { useGetYearMonthQuery, useChartDataQuery } from '../generated/graphql';
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

const Chart: React.FC = () => {
    // const data = [
    //     {
    //         name: 'January 2020',
    //         transportation: '300.00',
    //         lunch: '200.00',
    //         utilities: '300.00',
    //         color: 'red',
    //     },
    //     {
    //         name: 'February 2020',
    //         transportation: '254.00',
    //         lunch: '219.00',
    //         utilities: '290.00',
    //         color: 'blue',
    //     },
    //     {
    //         name: 'March 2020',
    //         transportation: '194.00',
    //         lunch: '209.00',
    //         utilities: '97.00',
    //         color: 'green',
    //     },
    // ];

    const { data, loading, error } = useChartDataQuery({
        variables: {
            date: [
                {
                    year: 2019,
                    month: 10,
                },
                {
                    year: 2019,
                    month: 11,
                },
                {
                    year: 2019,
                    month: 12,
                },
                {
                    year: 2020,
                    month: 1,
                },
                {
                    year: 2020,
                    month: 2,
                },
            ],
        },
    });

    if (loading) return <span>loading</span>;

    if (error) return <span>error</span>;

    const chartData = data?.chartData.payload.map((el: any) => ({
        ...el,
        color: 'red',
    }));
    const colors = ['red', 'pink', 'orange', 'purple', 'blue', 'grey', 'teal'];
    const categories = Object.keys(data?.chartData.payload[0]);
    return (
        <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                {/* <Tooltip /> */}
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
export const Transactions: React.FC<Props> = () => {
    return <Layout main={<Table />} chart={<Chart />} />;
};
