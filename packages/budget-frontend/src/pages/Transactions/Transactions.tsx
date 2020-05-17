import React, { useState, useEffect } from 'react';
import {
    useGetYearMonthQuery,
    useMonthlySpendingChartQuery,
    YearMonth,
} from '../../generated/graphql';
import clsx from 'clsx';
import { LoggedInNav } from '../../components/LoggedInNav';
import { Grid, Paper, makeStyles, Theme, createStyles, Divider } from '@material-ui/core';
import { YearMonthTab } from '../../components/YearMonthTab';
import { TransactionsTable } from '../../components/TransactionsTable';
import { PrimaryList } from '../../components/PrimaryList';
import { Drawer } from '../../components/Drawer';
import { BarChart } from '../../components/Charts/BarChart/BarChart';
import { TransactionForm } from './Components/TransactionForm/TransactionForm';

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

    const { data: yearMonth, loading } = useGetYearMonthQuery();
    const [active, setActive] = useState(0);

    useEffect(() => {
        yearMonth && setActive(yearMonth?.getYearMonth.length - 1);
    }, [yearMonth]);

    if (loading) {
        return <div>I'm loading</div>;
    }

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
                                    {yearMonth?.getYearMonth.length && (
                                        <YearMonthTab
                                            data={yearMonth}
                                            active={active}
                                            setActive={setActive}
                                        />
                                    )}
                                    {yearMonth?.getYearMonth.length ? (
                                        <TransactionsTable yearMonth={yearMonth} active={active} />
                                    ) : (
                                        <div>Why don't you add some transactions?</div>
                                    )}
                                </Paper>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TransactionForm />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={5} xs={9}>
                        <Paper className={fixedHeightPaper}>
                            {yearMonth?.getYearMonth[active]?.month ? (
                                <TransactionByCategoryChart
                                    date={{
                                        month: yearMonth!.getYearMonth[active].month,
                                        year: yearMonth!.getYearMonth[active].year,
                                    }}
                                />
                            ) : null}
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
