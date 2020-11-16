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
    Cell,
} from 'recharts';
import COLORS from '../colors';

interface ChartProps {
    name: string;
    budget: string;
    actual: string;
}

export const BarChart: React.FC<BarChartProps & LabelProps> = ({ data, value }) => {
    const notUncategorized = data!.filter((category: any) => category.name !== 'Uncategorized');
    console.log(notUncategorized);
    return (
        <ResponsiveContainer>
            <ReBarChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 10,
                }}
                data={notUncategorized}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name'>
                    {/* <Label value={value} offset={0} position='insideBottom' fill='white' /> */}
                </XAxis>
                <YAxis domain={[0, 'dataMax + 100']} />
                <Tooltip />
                <Legend
                    payload={[{ value: 'actual', type: 'rect', id: 'ID02', color: '#c12929' }]}
                />
                <Bar dataKey='budget' shape={<CustomBarWithTarget />} isAnimationActive={true}>
                    {data?.map((entry, index) => (
                        <Cell fill={COLORS[index % COLORS.length]} key={`${entry}-${index}`} />
                    ))}
                </Bar>
            </ReBarChart>
        </ResponsiveContainer>
    );
};

const CustomBarWithTarget = (props: any) => {
    const { fill, x, y, width, height, budget, actual } = props;
    let totalHeight = y + height;
    let targetY = totalHeight - (height / budget) * actual;

    return (
        <svg>
            <rect x={x} y={y} width={width} height={height} stroke='none' fill={fill} />
            <line
                x1={x - 8}
                x2={x + (width + 8)}
                y1={targetY}
                y2={targetY}
                stroke={'#c12929'}
                strokeWidth={4}
                // strokeDasharray={'10 5'}
            />
        </svg>
    );
};
