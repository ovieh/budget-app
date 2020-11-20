import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { useSumDebitsByYearMonthQuery } from '../../generated/graphql';
import { Panel } from './Panel';

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        fontSize: '6rem',
        colorSecondary: theme.palette.secondary,
    },
}));

const Expenses: React.FC<{ year: number; month: number; className?: string }> = ({
    year,
    month,
    className,
}) => {
    const classes = useStyles();

    const { data, loading } = useSumDebitsByYearMonthQuery({
        variables: {
            year,
            month,
        },
    });
    if (loading) {
        return <h1>loading</h1>;
    }

    return (
        // <Typography variant='h5' className={className}>
        //     Expenses: {data?.sumDebitsByYearMonth}
        // </Typography>
        <Panel
            type='expenses'
            amount={data?.sumDebitsByYearMonth}
            icon={<IndeterminateCheckBoxOutlinedIcon className={classes.icon} color='error' />}
        />
    );
};

export default Expenses;
