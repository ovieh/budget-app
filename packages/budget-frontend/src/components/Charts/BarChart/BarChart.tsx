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
    actual: number;
}

const filterCategory = (entry: ChartProps) => {
    if (entry.name !== 'Uncategorized' && entry.actual !== 0) {
        return true;
    }
};

export const BarChart: React.FC<BarChartProps & LabelProps> = ({ data, value }) => {
    const notUncategorized = data!.filter((category: any) => filterCategory(category));
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
                <XAxis dataKey='name' type='category' tick={<CustomizedAxisTick />}>
                    {/* <Label value={value} offset={0} position='insideBottom' fill='white' /> */}
                </XAxis>
                <YAxis
                    type='number'
                    domain={[0, 500]}
                    scale='linear'
                    label={{
                        value: value,
                        angle: -90,
                        position: 'insideBottomLeft',
                        fill: 'white',
                    }}
                >
                    {/* <Label value={value} offset={0} position='insideLeft' fill='white' /> */}
                </YAxis>
                <Tooltip />
                <Legend
                    payload={[{ value: 'budget', type: 'rect', id: 'ID02', color: '#c12929' }]}
                    margin={{ top: 20 }}
                />
                <Bar dataKey='actual' shape={<CustomBarWithTarget />} isAnimationActive={true}>
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
    let targetY = totalHeight - (height / actual) * budget;

    if (actual === 0) return null;

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

class CustomizedAxisTick extends React.PureComponent {
    render() {
        const { x, y, stroke, payload } = this.props as any;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor='end' fill='#666' transform='rotate(-35)'>
                    {payload.value}
                </text>
            </g>
        );
    }
}
