import React from 'react';
import {
    LineChart as ReLineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Line,
    Tooltip,
    ResponsiveContainer,
    LineChartProps,
} from 'recharts';

interface Props {
    categories: string[];
}

export const LineChart: React.FC<LineChartProps & Props> = ({ data, categories }) => {
    const colors = ['red', 'pink', 'orange', 'purple', 'blue', 'grey', 'teal'];

    return (
        <ResponsiveContainer>
            <ReLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            </ReLineChart>
        </ResponsiveContainer>
    );
};
