import React from 'react';
import { Typography, Select, makeStyles, createStyles, Theme } from '@material-ui/core';
import { useSumDebitsByYearMonthQuery } from '../generated/graphql';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        date: {
            paddingRight: theme.spacing(1),
        },
    })
);

export const DashboardContext: React.FC<Props> = () => {
    const classes = useStyles();
    const { data: expenses } = useSumDebitsByYearMonthQuery({
        variables: {
            year: 2019,
            month: 9,
        },
    });

    return (
        <div>
            <div className={classes.root}>
                <Typography className={classes.date} variant='h2' color='primary'>
                    May
                </Typography>
                <Typography className={classes.date} variant='h2' color='secondary'>
                    2020
                </Typography>
            </div>

            <Typography variant='h5'>Expenses: {expenses?.sumDebitsByYearMonth}</Typography>
            <Typography variant='h5'>Income: l33t</Typography>
            <Select />
        </div>
    );
};
