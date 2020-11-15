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

interface ChartProps {
    name: string;
    budget: string;
    actual: string;
}

export const BarChart: React.FC<BarChartProps & LabelProps> = ({ data, value }) => {
    const notUncategorized = data!.filter((category: any) => category.name !== 'Uncategorized');

    return (
        <ResponsiveContainer>
            <ReBarChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 40,
                }}
                data={notUncategorized}
                layout='vertical'
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis type='number' domain={[0, 420]}>
                    <Label value={value} offset={0} position='insideBottom' fill='white' />
                </XAxis>
                <YAxis dataKey='name' type='category' />
                <Tooltip />
                <Legend />
                <Bar dataKey='actual' fill='#82ca9d' stackId='stack' />
                <Bar dataKey='budget' fill='#8884d8' stackId='stack' />
                {/* <Bar
                    dataKey='budget'
                    shape={
                        <CustomBarWithTarget
                            t='actual'
                            // height={1000}
                            // x={2}
                            // y={2}
                            // width={10}
                            // amt='budget'
                        />
                    }
                    isAnimationActive={false}
                /> */}
            </ReBarChart>
        </ResponsiveContainer>
    );
};

const CustomBarWithTarget = (props: any) => {
    const { fill, x, y, width, height, amt, t } = props;

    let totalHeight = y + height;
    let targetY = totalHeight - (height / amt) * t;

    return (
        <svg>
            <rect x={x} y={y} width={width} height={height} stroke='none' fill={fill} />
            <line
                x1={x - 8}
                x2={x + (width + 8)}
                y1={targetY}
                y2={targetY}
                stroke={'#2967c1'}
                strokeWidth={2}
                strokeDasharray={'10 5'}
            />
        </svg>
    );
};
