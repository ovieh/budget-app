import React from 'react';
import {
    BarChartProps,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    Label,
    YAxis,
    Bar,
    Legend,
    Tooltip,
    LabelProps,
    BarChart as ReBarChart,
} from 'recharts';

export const BarChart: React.FC<BarChartProps & LabelProps> = ({ data, value }) => {
    return (
        <ResponsiveContainer>
            <ReBarChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 40,
                }}
                data={data}
                layout='vertical'
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis type='number'>
                    <Label value={value} offset={0} position='insideBottom' />
                </XAxis>
                <YAxis dataKey='name' type='category' />
                <Tooltip />
                <Legend />
                <Bar dataKey='budget' fill='#8884d8' />
                <Bar dataKey='actual' fill='#82ca9d' />
            </ReBarChart>
        </ResponsiveContainer>
    );
};
