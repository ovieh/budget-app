import { Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { GetYearMonthQuery } from '../generated/graphql';

interface Props {
    data: GetYearMonthQuery;
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
}

export const YearMonthTab: React.FC<Props> = ({ data, active, setActive }) => {
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        event.preventDefault();
        setActive(newValue);
    };

    return (
        <Tabs
            value={active}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            scrollButtons='auto'
        >
            {data &&
                data.getYearMonth.map((el: any, i: number) => (
                    <Tab label={`${el.month}/${el.year}`} key={i} />
                ))}
        </Tabs>
    );
};
