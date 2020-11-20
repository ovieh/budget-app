import {
    BottomNavigation,
    BottomNavigationAction,
    createStyles,
    Divider,
    Grid,
    Hidden,
    makeStyles,
    Paper,
    Theme,
    useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { BarChart } from '../../components/Charts/BarChart/BarChart';
import { DashboardContext } from '../../components/DashboardContext';
import { Drawer } from '../../components/Drawer';
import { LoggedInNav } from '../../components/LoggedInNav';
import { PrimaryList } from '../../components/PrimaryList';
import { TransactionsTable } from './Components/TransactionsTable';
import { useMonthlySpendingChartQuery, useMeQuery } from '../../generated/graphql';
import { TransactionForm } from './Components/TransactionForm/TransactionForm';
import { ActiveDateContext } from '../../context';
import Expenses from '../../components/Panel/Expenses';
import Income from '../../components/Panel/Income';
import { Currency } from '../../types/currency';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SimpleBottomNavigation from '../../components/BottomNavigation';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
        },
        bottomNavigation: {
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            position: 'fixed',
            bottom: 0,
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

        menuButton: {
            marginRight: 36,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(1),
            marginTop: theme.spacing(3),
        },
    })
);

export const Transactions: React.FC<Props> = () => {
    const { data } = useMeQuery();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const {
        store: { activeDate },
    } = useContext(ActiveDateContext);

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const theme = useTheme();

    const username = data?.me?.username;

    return (
        <div className={classes.container}>
            {' '}
            <div className={classes.root}>
                <LoggedInNav userName={username} handleDrawerOpen={handleDrawerOpen} open={open} />

                <Hidden smDown>
                    <Drawer handleDrawerClose={handleDrawerClose} open={open}>
                        <PrimaryList />
                        <Divider />
                    </Drawer>
                </Hidden>

                <main className={classes.content}>
                    <Grid container spacing={2} className={classes.content} wrap='wrap'>
                        <Grid item md={4} sm={12} xs={10}>
                            <Paper className={classes.paper}>
                                <DashboardContext />
                            </Paper>
                        </Grid>
                        <Grid item md={4} sm={6} xs={10}>
                            <Paper className={classes.paper}>
                                <Expenses year={activeDate.year} month={activeDate.month} />
                            </Paper>
                        </Grid>
                        <Grid item md={4} sm={6} xs={10}>
                            <Paper className={classes.paper}>
                                <Income year={activeDate.year} month={activeDate.month} />
                            </Paper>
                        </Grid>
                        <Grid item md={5} sm={12} xs={10}>
                            <Paper>
                                <TransactionsTable />
                            </Paper>
                        </Grid>
                        <Grid item md={5} sm={12} xs={10}>
                            <Paper className={fixedHeightPaper}>
                                <TransactionByCategoryChart date={activeDate} />
                            </Paper>
                        </Grid>
                        <Grid item md={2} sm={12} xs={10}>
                            <TransactionForm />
                        </Grid>
                    </Grid>
                </main>
            </div>
            <Hidden smUp>
                <SimpleBottomNavigation className={classes.bottomNavigation} />
            </Hidden>
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
