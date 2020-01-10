import React, { useState } from 'react';
import { useGetYearMonthQuery } from '../generated/graphql';
import { Tab, Tabs } from '@material-ui/core';
import styled from '@emotion/styled/macro';

interface Props {}

export const YearMonthTab: React.FC<Props> = () => {
    const { data } = useGetYearMonthQuery();
    const [action, setActive] = useState(0);

    // return (
    //     <pre>
    //         {data?.getYearMonth.map((el,i) => (
    //             <div key={i}>
    //                 {el.month}, {el.year}
    //             </div>
    //         ))}
    //     </pre>
    // );
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActive(newValue);
    };

    return (
        <Tabs
            value={action}
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
