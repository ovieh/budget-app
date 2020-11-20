import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { useSumDebitsByYearMonthQuery } from '../../generated/graphql';
import { Panel } from './Panel';

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        fontSize: '6rem',
        colorSecondary: theme.palette.secondary,
    },
}));

const Income: React.FC<{ year: number; month: number; className?: string }> = ({
    year,
    month,
    className,
}) => {
    const classes = useStyles();

    // const { data, loading } = useSumDebitsByYearMonthQuery({
    //     variables: {
    //         year,
    //         month,
    //     },
    // });
    // if (loading) {
    //     return <h1>loading</h1>;
    // }

    return (
        <Panel
            type='income'
            amount={300}
            icon={<AddBoxOutlinedIcon className={classes.icon} color='primary' />}
        />
    );
};

export default Income;
