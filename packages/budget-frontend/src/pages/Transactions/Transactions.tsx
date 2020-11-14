import { createStyles, Divider, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { BarChart } from '../../components/Charts/BarChart/BarChart';
import { DashboardContext } from '../../components/DashboardContext';
import { Drawer } from '../../components/Drawer';
import { LoggedInNav } from '../../components/LoggedInNav';
import { PrimaryList } from '../../components/PrimaryList';
import { TransactionsTable } from './Components/TransactionsTable';
import { useMonthlySpendingChartQuery, YearMonth, useMeQuery } from '../../generated/graphql';
import { TransactionForm } from './Components/TransactionForm/TransactionForm';
import { ActiveDateContext } from '../../context';

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
    const { data } = useMeQuery();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const {
        store: { activeDate },
    } = useContext(ActiveDateContext);

    const username = data?.me?.username;

    return (
        <div className={classes.root}>
            <LoggedInNav userName={username} />
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
                                    <TransactionsTable />
                                </Paper>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TransactionForm />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={5} xs={9}>
                        <Paper className={fixedHeightPaper}>
                            <TransactionByCategoryChart date={activeDate} />
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
    date: {
        year: number;
        month: number;
    };
}

export const TransactionByCategoryChart: React.FC<ChartProps> = ({ date }) => {
    const { year, month } = date;
    const { data, loading, error } = useMonthlySpendingChartQuery({
        // skip: !!date,
        variables: {
            year,
            month,
        },
    });

    const label = 'Spending by category';

    if (loading) {
        return <span>loading</span>;
    }

    if (error) {
        return <pre>{error.message}</pre>;
    }

    if (!data) return <h3>No Data</h3>;

    return <BarChart data={data?.MonthlySpendingChart.payload} value={label} />;
};
