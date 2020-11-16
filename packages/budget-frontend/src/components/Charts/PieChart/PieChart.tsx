import React from 'react';
import {
    ResponsiveContainer,
    PieChart as RePieChart,
    PieChartProps,
    Pie,
    Cell,
    PieLabelRenderProps,
    ContentRenderer,
    Tooltip,
    Legend,
} from 'recharts';
import COLORS from '../colors';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel: ContentRenderer<PieLabelRenderProps> = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    percent = 0,
    index,
}) => {
    cx = Number(cx);
    cy = Number(cy);
    innerRadius = Number(innerRadius);
    outerRadius = Number(outerRadius);

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle! * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill='white'
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline='central'
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer>
            <RePieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Pie
                    data={data}
                    dataKey='budget'
                    nameKey='budget'
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {data?.map((entry, index) => (
                        <Cell fill={COLORS[index % COLORS.length]} key={`${entry}-${index}`} />
                    ))}
                </Pie>
                <Legend verticalAlign='top' height={36} />
            </RePieChart>
        </ResponsiveContainer>
    );
};
