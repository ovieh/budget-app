import React, { useState } from 'react';
import { useGetYearMonthQuery, YearMonth } from '../generated/graphql';
import { Tab, Tabs } from '@material-ui/core';
import styled from '@emotion/styled/macro';
import { useApolloClient } from '@apollo/react-hooks';

// TODO fix horrible typings
interface Props {
    active: number;
    setActive: any;
    setYearMonth: any;
}

export const YearMonthTab: React.FC<Props> = ({
    active,
    setActive,
    setYearMonth,
}) => {
    const { data } = useGetYearMonthQuery();


    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        event.preventDefault();
        setActive(newValue);
        setYearMonth(data?.getYearMonth[newValue]);
    };

    return (
        <Tabs
            value={active}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
        >
            {data &&
                data.getYearMonth.map((el, i) => (
                    <Tab label={`${el.month}/${el.year}`} key={i} />
                ))}
        </Tabs>
    );
};
