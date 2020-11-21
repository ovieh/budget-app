import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { useSumCreditsByMonthQuery } from '../../generated/graphql';
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

    const { data } = useSumCreditsByMonthQuery({
        variables: {
            year,
            month,
        },
    });

    return (
        <Panel
            type='income'
            amount={data?.sumCreditsByMonth}
            icon={<AddBoxOutlinedIcon className={classes.icon} color='primary' />}
        />
    );
};

export default Income;
