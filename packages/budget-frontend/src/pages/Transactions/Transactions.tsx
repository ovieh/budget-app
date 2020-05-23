import { createStyles, Divider, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import clsx from 'clsx';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { BarChart } from '../../components/Charts/BarChart/BarChart';
import { DashboardContext } from '../../components/DashboardContext';
import { Drawer } from '../../components/Drawer';
import { LoggedInNav } from '../../components/LoggedInNav';
import { PrimaryList } from '../../components/PrimaryList';
import { TransactionsTable } from '../../components/TransactionsTable';
import { useMonthlySpendingChartQuery, YearMonth } from '../../generated/graphql';
import { TransactionForm } from './Components/TransactionForm/TransactionForm';
import { useQuery } from '@apollo/react-hooks';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        label: {
            paddingTop: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 482,
        },
        // appBar: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        //     marginLeft: drawerWidth,
        // },
        content: {
            flexGrow: 1,
            padding: theme.spacing(1),
            marginTop: theme.spacing(3),
        },
        // mainGrid: mar
    })
);

export const Transactions: React.FC<Props> = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const GET_ACTIVE_DATE = gql`
        query GetActiveDate {
            activeDate @client
        }
    `;

    const { data: yearMonth } = useQuery(GET_ACTIVE_DATE);

    // if (loading) {
    //     return <div>I'm loading</div>;
    // }

    // if (error) {
    //     return <pre>{JSON.stringify(error, null, 2)}</pre>;
    // }

    const year = parseInt(yearMonth.activeDate.split('/')[1]);
    const month = parseInt(yearMonth.activeDate.split('/')[0]);

    return (
        <div className={classes.root}>
            <LoggedInNav />
            <Drawer>
                <PrimaryList />
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <Grid container spacing={2} className={classes.content} wrap='wrap-reverse'>
                    <Grid item md={7} xs={9}>
                        <Grid container direction='column' spacing={1}>
                            <Grid item md={12}>
                                <Paper>
                                    <TransactionsTable year={year} month={month} />
                                </Paper>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TransactionForm />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={5} xs={9}>
                        <Paper className={fixedHeightPaper}>
                            <TransactionByCategoryChart
                                date={{
                                    month,
                                    year,
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item md={5} xs={9}>
                        <Paper className={classes.paper}>
                            <DashboardContext />
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};

interface ChartProps {
    date: YearMonth;
}

export const TransactionByCategoryChart: React.FC<ChartProps> = ({ date }) => {

    const { data, loading, error } = useMonthlySpendingChartQuery({
        // skip: !!date,
        variables: {
            date,
        },
    });

    const label = 'Spending by category';

    if (loading) {
        return <span>loading</span>;
    }

    if (error) {
        return <pre>{error.message}</pre>;
    }

    return <BarChart data={data?.MonthlySpendingChart.payload} value={label} />;
};
