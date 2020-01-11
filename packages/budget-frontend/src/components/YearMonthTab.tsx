import React, { useState } from 'react';
import { useGetYearMonthQuery, YearMonth } from '../generated/graphql';
import { Tab, Tabs } from '@material-ui/core';
import styled from '@emotion/styled/macro';

// TODO fix horrible typings
interface Props {
    setYearMonth?: (arg0: any) => any;
}

export const YearMonthTab: React.FC<Props> = ({ setYearMonth }) => {
    const { data } = useGetYearMonthQuery();

    const [active, setActive] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        event.preventDefault();
        setActive(newValue);
        setYearMonth!(data?.getYearMonth[newValue]);
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
                data.getYearMonth.map((el, i) => (
                    <Tab label={`${el.month}/${el.year}`} key={i} />
                ))}
        </Tabs>
    );
};
