import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { BarChart } from '../../components/Charts/BarChart/BarChart';
import { DashboardContext } from '../../components/DashboardContext';
import { TransactionsTable } from './Components/TransactionsTable';
import { useMonthlySpendingChartQuery } from '../../generated/graphql';
import { TransactionForm } from './Components/TransactionForm/TransactionForm';
import { ActiveDateContext } from '../../Contexts/ActiveDate';
import Expenses from '../../components/Panel/Expenses';
import Income from '../../components/Panel/Income';
import { Currency } from '../../types/currency';
import { Layout } from '../../components/Layout';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
        },
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
        content: {
            flexGrow: 1,
            padding: theme.spacing(1),
            marginTop: theme.spacing(3),
            [theme.breakpoints.down('sm')]: {
                width: 'calc(100% - 20px)',
            },
        },
    })
);

export const Transactions: React.FC<Props> = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const {
        store: { activeDate },
    } = useContext(ActiveDateContext);

    return (
        <Layout>
            <Grid container justify='center'>
                <Grid
                    container
                    spacing={2}
                    className={classes.content}
                    // wrap='wrap'
                    // alignItems='center'
                    justify='center'
                >
                    <Grid item md={4} sm={12} xs={12}>
                        <DashboardContext />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <Expenses year={activeDate.year} month={activeDate.month} />
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <Income year={activeDate.year} month={activeDate.month} />
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <Paper>
                            <TransactionsTable />
                        </Paper>
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <Paper className={fixedHeightPaper}>
                            <TransactionByCategoryChart date={activeDate} />
                        </Paper>
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TransactionForm />
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
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

    const label = `Spending by category in ${Currency.GBP}`;

    if (loading) {
        return <span>loading</span>;
    }

    if (error) {
        return <pre>{error.message}</pre>;
    }

    if (!data) return <h3>No Data</h3>;

    return <BarChart data={data?.MonthlySpendingChart.payload} value={label} />;
};
